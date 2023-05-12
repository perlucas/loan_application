import { Request, Response } from "express";
import { createDetailsFromBalanceSheet, LoanApplicationResult } from "../domain";
import { computePreassessment } from "../domain/loan_application_details";
import { toLoanApplicationDetailsJson } from "../network";
import { AccountingSystemRepository, CompanyRepository, LoanApplicationResultRepository } from "../repositories";
import { AccountingProviderFactory, LoanApplicationDetailsCache } from "../services/accounting";
import { DecisionEngine } from "../services/decision";
import { Controller } from "./controller";

export class LoanApplicationController extends Controller {

    constructor(
        private companyRepository: CompanyRepository,
        private accountingSystemRepository: AccountingSystemRepository,
        private applicationResultRepository: LoanApplicationResultRepository,
        private accountingProviderFactory: AccountingProviderFactory,
        private applicationCache: LoanApplicationDetailsCache,
        private decisionEngine: DecisionEngine
    ) {
        super()
    }

    async submitApplication(req: Request, res: Response) {
        const {
            company_id: companyId,
            accounting_system_id: accountingSystemId,
            amount
        } = req.body

        let company = null
        let accountingSystem = null

        const [details, err] = await this.tryCatchSurround(async () => {
            [company, accountingSystem] = await Promise.all([
                this.companyRepository.fetchById(companyId),
                this.accountingSystemRepository.fetchById(accountingSystemId)
            ])

            const provider = await this.accountingProviderFactory.createProvider(accountingSystem)
            const loanApplicationDetails = createDetailsFromBalanceSheet(
                /* @ts-ignore */
                company,
                accountingSystem,
                amount,
                /* @ts-ignore */
                await provider.getBalanceSheetForCompany(company)
            )

            await this.applicationCache.store(
                loanApplicationDetails.token,
                loanApplicationDetails,
                15 * 1000 // TTL: 15 min.
            )

            return loanApplicationDetails
        })

        if (err) {
            return res.status(LoanApplicationController.httpBadRequestCode())
                .json({
                    error: { code: 'INVALID_ARGUMENTS' }
                })
        }

        return res.status(LoanApplicationController.httpCreatedCode())
            .json({
                /* @ts-ignore */
                result: toLoanApplicationDetailsJson(details, company, accountingSystem)
            })
    }

    async confirmApplication(req: Request, res: Response) {
        const { token } = req.body

        const [details, err] = await this.tryCatchSurround(async () => {
            if (!token) {
                throw new Error()
            }

            return this.applicationCache.fetch(token)
        })

        if (err || !details) {
            return res.status(LoanApplicationController.httpBadRequestCode())
                .json({
                    error: { code: 'INVALID_OPERATION' }
                })
        }

        const preAssessment = computePreassessment(details)
        const decision = await this.decisionEngine.computeDecision(details, preAssessment)

        const result = new LoanApplicationResult(
            /* @ts-ignore */
            await this.companyRepository.fetchById(details.companyId),
            await this.accountingSystemRepository.fetchById(details.accountingSystemId),
            details.amount,
            preAssessment,
            decision
        )

        const storedResult = await this.applicationResultRepository.saveResult(result)
        return res.status(LoanApplicationController.httpCreatedCode())
            .json({
                /* @ts-ignore */
                result: toLoanApplicationResultJson(storedResult)
            })
    }

}
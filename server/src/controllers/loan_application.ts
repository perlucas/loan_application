import { Request, Response } from "express";
import { createDetailsFromBalanceSheet } from "../domain";
import { toLoanApplicationDetailsJson } from "../network";
import { AccountingSystemRepository, CompanyRepository } from "../repositories";
import { AccountingProviderFactory, LoanApplicationDetailsCache } from "../services/accounting";
import { Controller } from "./controller";

export class LoanApplicationController extends Controller {

    constructor(
        private companyRepository: CompanyRepository,
        private accountingSystemRepository: AccountingSystemRepository,
        private accountingProviderFactory: AccountingProviderFactory,
        private applicationCache: LoanApplicationDetailsCache
    ) {
        super()
    }

    async submitApplication(req: Request, res: Response) {
        const {
            company_id: companyId,
            accounting_system_id: accountingSystemId,
            amount
        } = req.body

        const [
            company,
            accountingSystem
        ] = await Promise.all([
            this.companyRepository.fetchById(companyId),
            this.accountingSystemRepository.fetchById(accountingSystemId)
        ])

        const [details, err] = await this.tryCatchSurround(async () => {
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
}
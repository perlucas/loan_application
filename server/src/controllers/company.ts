import { Request, Response } from "express"
import { Company } from "../domain"
import { toCompanyJson } from "../network"
import { CompanyRepository } from "../repositories"
import { Controller } from "./controller"

export class CompanyController extends Controller {
    constructor(
        private repository: CompanyRepository
    ) {
        super()
    }


    async fetchCompanies(_: Request, res: Response) {
        const companies = await this.repository.fetchAll()

        return res
            .status(CompanyController.httpOkCode())
            .json({
                result: companies.map(toCompanyJson)
            })
    }

    async createCompany(req: Request, res: Response) {
        const { name = '', established_at = '' } = req.body

        const [company, invalidArgsErr] = await this.tryCatchSurround(
            () => Company.createFromInputs(name, established_at)
        )

        if (invalidArgsErr) {
            return res
                .status(CompanyController.httpBadRequestCode())
                .json({
                    error: { code: 'INVALID_ARGUMENTS' }
                })
        }

        const [storedCompany, dbErr] = await this.tryCatchSurround(
            () => this.repository.saveCompany(company)
        )

        if (dbErr) {
            return res
                .status(CompanyController.httpInternalErrorCode())
                .json({
                    error: { code: 'INTERNAL_ERROR' }
                })
        }

        return res
            .status(CompanyController.httpCreatedCode())
            .json({
                result: toCompanyJson(storedCompany)
            })
    }
}
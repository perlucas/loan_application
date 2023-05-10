import { Request, Response } from "express"
import { toAccountingSystemJson } from "../network"
import { AccountingSystemRepository } from "../repositories"
import { Controller } from "./controller"

export class AccountingSystemController extends Controller {
    constructor(
        private repository: AccountingSystemRepository
    ) {
        super()
    }


    async fetchSystems(_: Request, res: Response) {
        const systems = await this.repository.fetchAll()

        return res
            .status(AccountingSystemController.httpOkCode())
            .json({
                result: systems.map(toAccountingSystemJson)
            })
    }
}
import { Knex } from "knex";
import { LoanApplicationResult } from "../../domain";
import { LoanApplicationResultRepository } from "../../repositories";

export class DBLoanApplicationResultRepository implements LoanApplicationResultRepository {

    constructor(
        private db: Knex
    ) { }

    async saveResult(r: LoanApplicationResult): Promise<LoanApplicationResult> {
        const [storedResult] = await this.db('loan_applications')
            .returning(['id'])
            .insert({
                accounting_system_id: r.getAccountingSystem().getId(),
                company_id: r.getCompany().getId(),
                amount: r.getAmount(),
                preassessment: r.getPreassessment(),
                result: r.getResult()
            })

        return new LoanApplicationResult(
            r.getCompany(),
            r.getAccountingSystem(),
            r.getAmount(),
            r.getPreassessment(),
            r.getResult(),
            /* @ts-ignore */
            storedResult.id
        )
    }
}
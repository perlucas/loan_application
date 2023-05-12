import { LoanApplicationResult } from "../domain";

export interface LoanApplicationResultRepository {
    saveResult(r: LoanApplicationResult): Promise<LoanApplicationResult>
}
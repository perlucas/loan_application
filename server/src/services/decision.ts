import { LoanApplicationDetails } from "../domain";

export type DecisionCode = 'APPROVED' | 'REJECTED'

export interface DecisionEngine {
    computeDecision(details: LoanApplicationDetails, preAssessment: number): Promise<DecisionCode>
}
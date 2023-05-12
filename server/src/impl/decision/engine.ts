import { LoanApplicationDetails } from "../../domain";
import { DecisionCode, DecisionEngine } from "../../services/decision";

export class DecisionEngineImpl implements DecisionEngine {
    computeDecision(details: LoanApplicationDetails, preAssessment: number): Promise<DecisionCode> {
        if (preAssessment >= 60) {
            return Promise.resolve('APPROVED')
        }
        return Promise.resolve('REJECTED')
    }
}
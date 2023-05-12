import { DecisionCode } from "../services/decision";
import AccountingSystem from "./accounting_system";
import Company from "./company";

export class LoanApplicationResult {
    constructor(
        private company: Company,
        private accountingSystem: AccountingSystem,
        private amount: number,
        private preAssessment: number,
        private result: DecisionCode,
        private id: number | null = null
    ) { }

    getCompany(): Company {
        return this.company
    }

    getAccountingSystem(): AccountingSystem {
        return this.accountingSystem
    }

    getAmount(): number {
        return this.amount
    }

    getPreassessment(): number {
        return this.preAssessment
    }

    getResult(): DecisionCode {
        return this.result
    }

    getId() {
        return this.id
    }
}
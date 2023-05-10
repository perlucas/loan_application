import AccountingSystem from "./accounting_system"
import BalanceSheet from "./balance_sheet"
import Company from "./company"
import { v4 as uuidv4 } from 'uuid';

export interface LoanApplicationDetails {
    companyId: number,
    accountingSystemId: number,
    amount: number,
    profitInAYear: number,
    averageAssetsInAYear: number,
    token: string
}

export function createDetailsFromBalanceSheet(
    company: Company,
    accountingSystem: AccountingSystem,
    amount: number,
    sheet: BalanceSheet
): LoanApplicationDetails {
    if (!company || !company.getId) {
        throw new Error('invalid company')
    }

    if (!accountingSystem || !accountingSystem.getId) {
        throw new Error('invalid accounting system')
    }

    if (amount <= 0) {
        throw new Error('invalid amount')
    }


    return {
        /* @ts-ignore */
        companyId: company.getId(),
        /* @ts-ignore */
        accountingSystemId: accountingSystem.getId(),
        amount,
        profitInAYear: sheet.getProfitOrLossForLastNMonths(12),
        averageAssetsInAYear: sheet.getProfitOrLossForLastNMonths(12),
        token: uuidv4()
    }
}

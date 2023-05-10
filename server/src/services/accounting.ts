import { AccountingSystem, BalanceSheet, Company, LoanApplicationDetails } from "../domain"

export interface AccountingProvider {
    getBalanceSheetForCompany(company: Company): Promise<BalanceSheet>
}

export interface AccountingProviderFactory {
    createProvider(system: AccountingSystem | null): Promise<AccountingProvider>
}

export interface LoanApplicationDetailsCache {
    store(token: string, details: LoanApplicationDetails, ttl: number): Promise<void>

    fetch(token: string): Promise<LoanApplicationDetails | null>
}
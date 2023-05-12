import { AccountingSystem, BalanceSheet, Company } from "../../domain";
import { AccountingProvider, AccountingProviderFactory } from "../../services/accounting";

export class AccountingProviderFactoryImpl implements AccountingProviderFactory {
    async createProvider(_: AccountingSystem | null): Promise<AccountingProvider> {
        return new AccountingProviderImpl()
    }
}

class AccountingProviderImpl implements AccountingProvider {

    async getBalanceSheetForCompany(_: Company): Promise<BalanceSheet> {
        return new BalanceSheet(this.buildFakeStatements())
    }

    private buildFakeStatements(): any[] {
        const statements = []
        for (let month = 1; month <= 12; month++) {
            statements.push({
                year: 2023,
                month,
                profitOrLoss: (Math.random() * 5000) - 1500,
                assetsValue: (Math.random() * 10000) - 4000
            })
        }
        return statements
    }
}
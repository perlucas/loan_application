interface MonthlyStatement {
    year: number,
    month: number,
    profitOrLoss: number,
    assetsValue: number
}

export default class BalanceSheet {
    constructor(
        private monthlyStatements: MonthlyStatement[]
    ) { }

    getProfitOrLossForLastNMonths(n: number): number {
        return 0
    }

    getAverageAssetsValueForLastNMonths(n: number): number {
        return 0
    }
}
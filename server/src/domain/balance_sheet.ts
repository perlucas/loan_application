interface MonthlyStatement {
    year: number,
    month: number,
    profitOrLoss: number,
    assetsValue: number
}

export default class BalanceSheet {
    constructor(
        private monthlyStatements: MonthlyStatement[]
    ) {
        this.monthlyStatements.sort((s1, s2) => {
            return s1.year === s2.year
                ? s1.month - s2.month
                : s1.year - s2.year
        })
    }

    getProfitOrLossForLastNMonths(n: number): number {
        if (n === 0) {
            return 0
        }

        const limit = this.validateAndRoundNumber(n)
        const statements = this.monthlyStatements.slice(0, limit)
        return statements.reduce((total, s) => total + s.profitOrLoss, 0)
    }

    getAverageAssetsValueForLastNMonths(n: number): number {
        if (n === 0) {
            return 0
        }

        const limit = this.validateAndRoundNumber(n)
        const statements = this.monthlyStatements.slice(0, limit)
        return statements.reduce((total, s) => total + s.assetsValue, 0) / statements.length
    }

    private validateAndRoundNumber(n: number): number {
        if (n < 0) {
            throw new Error('invalid N provided')
        }

        return Math.round(n)
    }
}
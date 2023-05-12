import { BalanceSheet } from "../../src/domain"

const sampleStatements = [
    {
        year: 2022,
        month: 1,
        profitOrLoss: 5000,
        assetsValue: 7000
    },
    {
        year: 2022,
        month: 2,
        profitOrLoss: -100,
        assetsValue: 3000
    },
    {
        year: 2022,
        month: 3,
        profitOrLoss: -500,
        assetsValue: 3100
    },
    {
        year: 2022,
        month: 4,
        profitOrLoss: 1000,
        assetsValue: 4200
    },
    {
        year: 2022,
        month: 5,
        profitOrLoss: 1500,
        assetsValue: 4500
    },
    {
        year: 2022,
        month: 6,
        profitOrLoss: 2000,
        assetsValue: 3500
    },
    {
        year: 2022,
        month: 7,
        profitOrLoss: -300,
        assetsValue: 1700
    },
    {
        year: 2022,
        month: 8,
        profitOrLoss: -1500,
        assetsValue: 500
    },
    {
        year: 2022,
        month: 9,
        profitOrLoss: 1500,
        assetsValue: 1000
    },
    {
        year: 2022,
        month: 10,
        profitOrLoss: 3000,
        assetsValue: 5200
    },
    {
        year: 2022,
        month: 11,
        profitOrLoss: 2000,
        assetsValue: 4500
    },
    {
        year: 2022,
        month: 12,
        profitOrLoss: 3000,
        assetsValue: 7300
    }
]

const totalProfitIn12Months = 16600
const avgAssetsValueIn12Months = 45500 / 12
const totalProfitIn6Months = 8900
const avgAssetsValueIn6Months = 25300 / 6

describe('computation methods', () => {

    test('should fail if provided N is < 0', () => {
        const sheet = new BalanceSheet(sampleStatements)
        expect(() => {
            sheet.getProfitOrLossForLastNMonths(-3)
        }).toThrowError()

        expect(() => {
            sheet.getAverageAssetsValueForLastNMonths(-1)
        }).toThrowError()

    })

    test('should return 0 if N == 0', () => {
        const sheet = new BalanceSheet(sampleStatements)
        expect(sheet.getAverageAssetsValueForLastNMonths(0)).toEqual(0)
        expect(sheet.getProfitOrLossForLastNMonths(0)).toEqual(0)
    })

    test('should return partial result if N > #statements', () => {
        const sheet = new BalanceSheet(sampleStatements)

        expect(sheet.getAverageAssetsValueForLastNMonths(24)).toEqual(avgAssetsValueIn12Months)
        expect(sheet.getProfitOrLossForLastNMonths(24)).toEqual(totalProfitIn12Months)
    })

    test('should compute only last N months if N < #statements', () => {
        const sheet = new BalanceSheet(sampleStatements)

        expect(sheet.getAverageAssetsValueForLastNMonths(6)).toEqual(avgAssetsValueIn6Months)
        expect(sheet.getProfitOrLossForLastNMonths(6)).toEqual(totalProfitIn6Months)
    })

    test('should ignore older statements if N < #statements', () => {
        const unorderedStatements = [...sampleStatements].sort(() => (Math.random() * 100) - 0.5)

        const sheet = new BalanceSheet(unorderedStatements)

        expect(sheet.getAverageAssetsValueForLastNMonths(6)).toEqual(avgAssetsValueIn6Months)
        expect(sheet.getProfitOrLossForLastNMonths(6)).toEqual(totalProfitIn6Months)
    })

})
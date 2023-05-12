import { AccountingSystem, BalanceSheet, Company, createDetailsFromBalanceSheet } from "../../src/domain"
import { computePreassessment } from "../../src/domain/loan_application_details"

jest.mock('uuid', () => ({
    v4: () => 'test-123'
}))

describe('create from balance sheet', () => {

    test('should fail if invalid company', () => {
        expect(() => {
            createDetailsFromBalanceSheet(
                new Company('without ID', new Date()),
                new AccountingSystem('fake', 1000),
                300,
                new BalanceSheet([])
            )
        }).toThrowError()
    })

    test('should fail if invalid accounting system', () => {
        expect(() => {
            createDetailsFromBalanceSheet(
                new Company('fake', new Date(), 1000),
                new AccountingSystem('without ID'),
                300,
                new BalanceSheet([])
            )
        }).toThrowError()
    })

    test('should fail if invalid amount', () => {
        expect(() => {
            createDetailsFromBalanceSheet(
                new Company('fake', new Date(), 1000),
                new AccountingSystem('without ID'),
                300,
                new BalanceSheet([])
            )
        }).toThrowError()
    })

    test.each([0, -300])(
        'should fail if invalid amount',
        (amount) => {
            expect(() => {
                createDetailsFromBalanceSheet(
                    new Company('fake', new Date(), 1000),
                    new AccountingSystem('fake', 1000),
                    amount,
                    new BalanceSheet([])
                )
            }).toThrowError()
        }
    )

    test('should return expected object', () => {
        const sheetMock = new BalanceSheet([])
        sheetMock.getProfitOrLossForLastNMonths = jest.fn().mockReturnValueOnce(10)
        sheetMock.getAverageAssetsValueForLastNMonths = jest.fn().mockReturnValueOnce(20)

        const details = createDetailsFromBalanceSheet(
            new Company('test', new Date(), 1000),
            new AccountingSystem('test', 2000),
            1500,
            sheetMock
        )

        expect(details).toEqual({
            companyId: 1000,
            accountingSystemId: 2000,
            amount: 1500,
            profitInAYear: 10,
            averageAssetsInAYear: 20,
            token: 'test-123'
        })

        expect(sheetMock.getAverageAssetsValueForLastNMonths).toHaveBeenCalledWith(12)
        expect(sheetMock.getProfitOrLossForLastNMonths).toHaveBeenCalledWith(12)
    })

})

describe('compute preassessment tests', () => {
    test.each([
        [100, 200, 100, 100], // avg assets > amount
        [100, 100, 100, 60], // has made a profit
        [-100, 200, 1000, 20],
    ])('should return expected preassessment', (profit, avgAssets, amount, expected) => {
        expect(computePreassessment({
            companyId: 100,
            accountingSystemId: 200,
            token: 'test',
            profitInAYear: profit,
            averageAssetsInAYear: avgAssets,
            amount
        })).toEqual(expected)
    })
})
import { LoanApplicationDetailsNodeCache } from "../../../src/impl/accounting/cache"

const sleep = (ms: number) => new Promise((resolve, _) => {
    setTimeout(resolve, ms)
})

describe('loan application cache tests', () => {
    test('should store, keep and expire cached values', async () => {
        const cache = new LoanApplicationDetailsNodeCache()
        const loanDetails = {
            accountingSystemId: 1,
            companyId: 2,
            amount: 3500,
            averageAssetsInAYear: 900,
            profitInAYear: 300,
            token: 'test-123'
        }

        await cache.store(loanDetails.token, loanDetails, 500)

        expect(await cache.fetch(loanDetails.token)).toEqual(loanDetails)
        expect(await cache.fetch(loanDetails.token)).toEqual(loanDetails)
        expect(await cache.fetch(loanDetails.token)).toEqual(loanDetails)

        await sleep(1000)
        expect(await cache.fetch(loanDetails.token)).toEqual(null)
    })
})
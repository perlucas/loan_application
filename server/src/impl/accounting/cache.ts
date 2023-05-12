import { LoanApplicationDetails } from "../../domain";
import { LoanApplicationDetailsCache } from "../../services/accounting";

export class LoanApplicationDetailsNodeCache implements LoanApplicationDetailsCache {
    private cache: Map<string, any>

    constructor() {
        this.cache = new Map()

        setInterval(this.expireValues.bind(this), 2000)
    }

    private expireValues() {
        const entries = this.cache.entries()
        const now = new Date()
        for (const [token, stored] of entries) {
            const { expireAt } = stored
            if (expireAt.getTime() < now.getTime()) {
                this.cache.delete(token)
            }
        }
    }

    async store(token: string, details: LoanApplicationDetails, ttl: number): Promise<void> {
        const expireAt = new Date()
        expireAt.setMilliseconds(expireAt.getMilliseconds() + ttl)

        this.cache.set(token, { value: details, expireAt })

        setTimeout(() => this.cache.delete(token), ttl)
    }

    async fetch(token: string): Promise<LoanApplicationDetails | null> {
        if (!this.cache.has(token)) {
            return null
        }

        const { value: details } = this.cache.get(token)
        return details
    }

    remove(token: string): Promise<void> {
        this.cache.delete(token)
        return Promise.resolve()
    }
}
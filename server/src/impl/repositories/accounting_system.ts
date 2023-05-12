import { Knex } from "knex";
import { AccountingSystem } from "../../domain";
import { AccountingSystemRepository } from "../../repositories";

export class DBAccountingSystemRepository implements AccountingSystemRepository {

    constructor(
        private db: Knex
    ) { }

    async fetchAll(): Promise<AccountingSystem[]> {
        const systems = await this.db('accounting_system').select()
        return systems.map(s => new AccountingSystem(s.name, s.id))
    }

    async fetchById(id: string | number): Promise<AccountingSystem | null> {
        const result = await this.db('accounting_system')
            .where('id', id)
            .limit(1)
            .select()

        if (result.length > 0) {
            const [data] = result
            return new AccountingSystem(data.name, data.id)
        }
        return null
    }
}
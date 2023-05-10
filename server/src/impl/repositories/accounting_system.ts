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
}
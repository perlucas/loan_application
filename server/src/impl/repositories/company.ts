import { Knex } from "knex";
import { Company } from "../../domain";
import { CompanyRepository } from "../../repositories";

export class DBCompanyRepository implements CompanyRepository {

    constructor(
        private db: Knex
    ) { }

    async fetchAll(): Promise<Company[]> {
        const companies = await this.db('company').select()
        return companies.map(c => new Company(
            c.name,
            new Date(c.established_at),
            c.id
        ))
    }

    async saveCompany(c: Company): Promise<Company> {
        const [storedCompany] = await this.db('company')
            .returning(['id', 'name', 'established_at'])
            .insert({
                name: c.getName(),
                established_at: c.getEstablishmentDate().toISOString()
            })

        return new Company(
            /* @ts-ignore */
            storedCompany.name,
            /* @ts-ignore */
            new Date(storedCompany.established_at.split('T')[0]),
            /* @ts-ignore */
            storedCompany.id
        )
    }

    async fetchById(id: string | number): Promise<Company | null> {
        const result = await this.db('company')
            .where('id', id)
            .limit(1)
            .select()

        if (result.length > 0) {
            const [data] = result
            return new Company(
                data.name,
                new Date(data.established_at),
                data.id
            )
        }

        return null
    }
}
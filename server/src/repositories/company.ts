import { Company } from "../domain";

export interface CompanyRepository {

    fetchAll(): Promise<Company[]>

    fetchById(id: string | number): Promise<Company | null>

    saveCompany(c: Company): Promise<Company>
}
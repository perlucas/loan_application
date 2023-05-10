import { Company } from "../domain";

export interface CompanyRepository {

    fetchAll(): Promise<Company[]>

    saveCompany(c: Company): Promise<Company>
}
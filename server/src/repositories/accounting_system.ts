import { AccountingSystem } from "../domain";

export interface AccountingSystemRepository {

    fetchAll(): Promise<AccountingSystem[]>
}
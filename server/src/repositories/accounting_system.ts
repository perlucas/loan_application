import { AccountingSystem } from "../domain";

export interface AccountingSystemRepository {

    fetchAll(): Promise<AccountingSystem[]>

    fetchById(id: string | number): Promise<AccountingSystem | null>
}
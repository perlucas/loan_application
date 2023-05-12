import { DBCompanyRepository } from "./repositories/company";
import { DBAccountingSystemRepository } from "./repositories/accounting_system";
import { AccountingProviderFactoryImpl } from './accounting/factory'
import { LoanApplicationDetailsNodeCache } from './accounting/cache'

export const repositories = { DBCompanyRepository, DBAccountingSystemRepository }

export const accounting = { AccountingProviderFactoryImpl, LoanApplicationDetailsNodeCache }
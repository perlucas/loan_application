import { DBCompanyRepository } from "./repositories/company";
import { DBAccountingSystemRepository } from "./repositories/accounting_system";
import { DBLoanApplicationResultRepository } from "./repositories/loan_application_result";
import { AccountingProviderFactoryImpl } from './accounting/factory'
import { LoanApplicationDetailsNodeCache } from './accounting/cache'

export const repositories = { DBCompanyRepository, DBAccountingSystemRepository, DBLoanApplicationResultRepository }

export const accounting = { AccountingProviderFactoryImpl, LoanApplicationDetailsNodeCache }
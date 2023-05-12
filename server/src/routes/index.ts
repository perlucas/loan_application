import { Router } from "express";
import { dbInstance } from "../../db";
import { CompanyController, AccountingSystemController, LoanApplicationController } from "../controllers";
import { repositories, accounting } from "../impl";
import { DecisionEngineImpl } from "../impl/decision/engine";

const router = Router()

const companyRepository = new repositories.DBCompanyRepository(dbInstance())
const companyController = new CompanyController(companyRepository)

router.get('/company', companyController.method(companyController.fetchCompanies))

router.post('/company', companyController.method(companyController.createCompany))

const accountingSystemRepository = new repositories.DBAccountingSystemRepository(dbInstance())
const accountingSystemController = new AccountingSystemController(
    accountingSystemRepository
)

router.get('/accounting_system', accountingSystemController.method(accountingSystemController.fetchSystems))

const loanApplicationController = new LoanApplicationController(
    companyRepository,
    accountingSystemRepository,
    new repositories.DBLoanApplicationResultRepository(dbInstance()),
    new accounting.AccountingProviderFactoryImpl(),
    new accounting.LoanApplicationDetailsNodeCache(),
    new DecisionEngineImpl()
)

router.post('/loan/request', loanApplicationController.method(loanApplicationController.submitApplication))

router.post('/loan/confirm', loanApplicationController.method(loanApplicationController.confirmApplication))

export default router

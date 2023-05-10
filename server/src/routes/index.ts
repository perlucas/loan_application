import { Router } from "express";
import { dbInstance } from "../../db";
import { CompanyController, AccountingSystemController } from "../controllers";
import { DBAccountingSystemRepository, DBCompanyRepository } from "../impl";

const router = Router()

const companyController = new CompanyController(
    new DBCompanyRepository(dbInstance())
)

router.get('/company', companyController.method(companyController.fetchCompanies))

router.post('/company', companyController.method(companyController.createCompany))

const accountingSystemController = new AccountingSystemController(
    new DBAccountingSystemRepository(dbInstance())
)

router.get('/accounting_system', accountingSystemController.method(accountingSystemController.fetchSystems))

export default router

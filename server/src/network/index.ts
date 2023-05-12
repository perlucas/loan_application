import { AccountingSystem, Company, LoanApplicationDetails, LoanApplicationResult } from "../domain";
import { DecisionCode } from "../services/decision";

interface CompanyJson {
    id: number | null,
    name: string,
    established_at: string
}

interface AccountingSystemJson {
    id: number | null,
    name: string
}

interface LoanApplicationDetailsJson {
    token: string,
    company: CompanyJson,
    accounting_system: AccountingSystemJson,
    amount: number
}

interface LoanApplicationResultJson {
    id: number | null,
    company: CompanyJson,
    accounting_system: AccountingSystemJson,
    amount: number,
    result: DecisionCode
}

export function toCompanyJson(c: Company): CompanyJson {
    const formatDate = (d: Date): string => d.toISOString().split('T')[0]

    return {
        id: c.getId(),
        name: c.getName(),
        established_at: formatDate(c.getEstablishmentDate())
    }
}

export function toAccountingSystemJson(s: AccountingSystem): AccountingSystemJson {
    return {
        id: s.getId(),
        name: s.getName()
    }
}

export function toLoanApplicationDetailsJson(
    d: LoanApplicationDetails,
    c: Company,
    s: AccountingSystem
): LoanApplicationDetailsJson {
    return {
        token: d.token,
        company: toCompanyJson(c),
        accounting_system: toAccountingSystemJson(s),
        amount: d.amount
    }
}

export function toLoanApplicationResultJson(r: LoanApplicationResult): LoanApplicationResultJson {
    return {
        id: r.getId(),
        company: toCompanyJson(r.getCompany()),
        accounting_system: toAccountingSystemJson(r.getAccountingSystem()),
        amount: r.getAmount(),
        result: r.getResult()
    }
}
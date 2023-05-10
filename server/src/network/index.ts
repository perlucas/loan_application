import { AccountingSystem, Company } from "../domain";

interface CompanyJson {
    id: number | null,
    name: string,
    established_at: string
}

interface AccountingSystemJson {
    id: number | null,
    name: string
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
export default class Company {
    constructor(
        private name: string,
        private establishedAt: Date,
        private id: number | null = null
    ) { }

    getName(): string {
        return this.name
    }

    getEstablishmentDate(): Date {
        return this.establishedAt
    }

    getEstablishmentYear(): number {
        return this.establishedAt.getFullYear()
    }

    getId(): number | null {
        return this.id
    }

    static createFromInputs(name: string, establishedAt: string): Company {
        if (name.length === 0) {
            throw new Error('name should not be empty')
        }

        const datePattern = /^\d{4}-\d{2}-\d{2}$/
        if (!datePattern.test(establishedAt)) {
            throw new Error('establishedAt is invalid')
        }

        return new Company(name, new Date(establishedAt))
    }
}
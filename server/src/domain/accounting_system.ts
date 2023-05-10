export default class AccountingSystem {
    constructor(
        private name: string,
        private id: number | null = null
    ) { }

    getName(): string {
        return this.name
    }

    getId(): number | null {
        return this.id
    }
}
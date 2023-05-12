import { Company } from "../../src/domain"

describe('create company from inputs', () => {

    test('should not create company with wrong name', () => {
        expect(() => {
            Company.createFromInputs('', '1995-10-10')
        }).toThrowError()
    })

    test.each(
        ['', '2023', '2023-299', '2023-10', '2023-10-100', '2023-9-09']
    )('should not create company with wrong establishedAt', (dateValue) => {
        expect(() => {
            Company.createFromInputs('test', dateValue)
        }).toThrowError()
    })

    test('should create expected company', () => {
        const c = Company.createFromInputs('Company A', '1998-03-15')

        expect(c.getId()).toBeNull()
        expect(c.getName()).toEqual('Company A')
        expect(c.getEstablishmentYear()).toEqual(1998)
        expect(c.getEstablishmentDate().toISOString()).toEqual("1998-03-15T00:00:00.000Z")
    })

})
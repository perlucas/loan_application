import { isEmpty, isString } from "lodash/lang";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../services";

function isValidInput({ companyId, systemId, amount }) {
    const isValidId = value => !isEmpty(value) &&
        isString(value) &&
        /^\d+$/.test(value)

    const isValidAmount = !isEmpty(amount) &&
        /^\d+(\.\d+)?$/.test(amount) &&
        +amount > 0

    return isValidId(companyId) && isValidId(systemId) && isValidAmount
}

function ApplicationForm(props) {
    const [userInput, setUserInput] = useState({
        companyId: '',
        systemId: '',
        amount: ''
    })

    const [hasError, setHasError] = useState(false)

    const [companies, setCompanies] = useState([])

    const [systems, setSystems] = useState([])

    const handlers = {
        handleCompanyPicked: function (evt) {
            setUserInput(prev => ({ ...prev, companyId: evt.target.value }))
        },

        handleSystemPicked: function (evt) {
            setUserInput(prev => ({ ...prev, systemId: evt.target.value }))
        },

        handleAmountChanged: function (evt) {
            setUserInput(prev => ({ ...prev, amount: evt.target.value }))
        },

        handleFormSubmit: function (evt) {
            evt.preventDefault();

            if (!isValidInput(userInput)) {
                setHasError(true)
                return
            }

            setHasError(false)
            props.onSubmit(userInput)
        }
    }

    useEffect(() => {
        getRequest('/company')
            .then(({ result: companies }) => {
                setCompanies(companies)
            })
            .catch(() => setCompanies([]))

        getRequest('/accounting_system')
            .then(({ result: systems }) => {
                setSystems(systems)
            })
            .catch(() => setSystems([]))
    }, [])

    return <React.Fragment>
        <h1>Submit Loan Application</h1>
        {hasError && <div className="error-box">Some entered values are invalid, please correct them and try again!</div>}
        <form>
            <div className="grid">
                <div>
                    <label htmlFor="company">Company</label>
                    <select
                        name="company"
                        required
                        value={userInput.companyId}
                        onChange={handlers.handleCompanyPicked}
                    >
                        <option value="">Select a company...</option>
                        {companies.map(c => <option value={c.id + ''}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="system">Accounting system</label>
                    <select
                        name="system"
                        required
                        value={userInput.systemId}
                        onChange={handlers.handleSystemPicked}
                    >
                        <option value="">Select a system...</option>
                        {systems.map(s => <option value={s.id + ''}>{s.name}</option>)}
                    </select>
                </div>
            </div>

            <label htmlFor="amount">
                Amount
                <input
                    type="number"
                    name="amount"
                    placeholder="e.g.: 45000"
                    required
                    value={userInput.amount}
                    onChange={handlers.handleAmountChanged}
                />
            </label>

            <button type="submit" onClick={handlers.handleFormSubmit}>Submit</button>
        </form>
    </React.Fragment>
}

export default ApplicationForm;
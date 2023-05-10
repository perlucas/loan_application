import { isEmpty, isString } from "lodash/lang";
import React, { useState } from "react";

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
                        <option value="1">Fake company 1</option>
                        <option value="2">Fake company 2</option>
                        <option value="3">Fake company 3</option>
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
                        <option value="1">XERO</option>
                        <option value="2">MIOB</option>
                        <option value="3">Fake company 3</option>
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
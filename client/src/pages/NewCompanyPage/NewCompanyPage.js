import { isString } from "lodash/lang";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../layout/Container/Container";
import { postRequest } from "../../services";

function isValidCompany({ name, establishedAt }) {
    const isValidName = isString(name) && name.length > 0
    const isValidEstablishedAt = isString(establishedAt) && /\d{4}-\d{2}-\d{2}/.test(establishedAt)
    console.log(name, establishedAt, isValidName, isValidEstablishedAt)
    return isValidName && isValidEstablishedAt
}

function NewCompanyPage(props) {
    const navigate = useNavigate()

    const [company, setCompany] = useState({
        name: '',
        establishedAt: ''
    })

    const [hasError, setHasError] = useState(false)

    const handlers = {
        handleNameChanged: function (evt) {
            setCompany(prev => ({ ...prev, name: evt.target.value }))
        },
        handleDateChanged: function (evt) {
            setCompany(prev => ({ ...prev, establishedAt: evt.target.value }))
        },
        handleFormSubmit: function (evt) {
            evt.preventDefault()

            if (!isValidCompany(company)) {
                setHasError(true)
                return
            }

            postRequest('/company', {
                name: company.name,
                established_at: company.establishedAt
            })
                .then(() => navigate('/'))
                .catch(() => setHasError(true))
        }
    }

    return <Container
        links={[
            { path: '/', label: 'Apply for Loan' }
        ]}
    >
        <h1>Register New Company</h1>
        {hasError && <div className="error-box">Some entered values are invalid, please correct them and try again!</div>}
        <form>
            <div className="grid">
                <div>
                    <label htmlFor="company_name">Name</label>
                    <input
                        id="company_name"
                        type="text"
                        required
                        placeholder="e.g.: Google"
                        value={company.name}
                        onChange={handlers.handleNameChanged}
                    />
                </div>
                <div>
                    <label htmlFor="company_date">Established date</label>
                    <input
                        id="company_date"
                        type="date"
                        required
                        value={company.establishedAt}
                        onChange={handlers.handleDateChanged}
                    />
                </div>
            </div>
            <button type="submit" onClick={handlers.handleFormSubmit}>Submit</button>
        </form>
    </Container >
}

export default NewCompanyPage;
import { useState } from "react";
import ApplicationFormPage from "../ApplicationFormPage/ApplicationFormPage";
import ReviewDetailsPage from "../ReviewDetailsPage/ReviewDetailsPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import ApplicationResultPage from "../ApplicationResultPage/ApplicationResultPage";
import { postRequest } from "../../services";

const SUBMITTING_APPLICATION = 'SUBMITTING_APPLICATION'
const REVIEWING_APPLICATION = 'REVIEWING_APPLICATION'
const REVIEWING_APPLICATION_RESULT = 'REVIEWING_APPLICATION_RESULT'
const ERRORED = 'ERRORED'

function ApplicationPage() {
    const [workflowStatus, setWorkflowStatus] = useState(SUBMITTING_APPLICATION)

    const [loanApplicationDetails, setLoanApplicationDetails] = useState(null)

    const handlers = {
        handleApplicationRequested: function (data) {
            console.log(data)
            const { companyId, systemId, amount } = data

            postRequest('/loan/request', {
                amount,
                company_id: companyId,
                accounting_system_id: systemId
            })
                .then(({ result: loanDetails }) => {
                    setLoanApplicationDetails({
                        ...loanDetails,
                        accountingSystem: loanDetails.accounting_system
                    })
                    setWorkflowStatus(REVIEWING_APPLICATION)
                })
                .catch(() => {
                    setWorkflowStatus(ERRORED)
                })
        },

        handleApplicationConfirmed: function () {
            console.log('confirmation sent!')

            postRequest('/loan/confirm', { token: loanApplicationDetails.token })
                .then(({ result: loanDetails }) => {
                    setLoanApplicationDetails({
                        ...loanDetails,
                        accountingSystem: loanDetails.accounting_system
                    })

                    setWorkflowStatus(REVIEWING_APPLICATION_RESULT)
                })
                .catch(() => {
                    setWorkflowStatus(ERRORED)
                })
        },

        handleApplicationCancelled: function () {
            setWorkflowStatus(SUBMITTING_APPLICATION)
        }
    }

    const componentsByStatus = {
        [SUBMITTING_APPLICATION]: () => <ApplicationFormPage
            onSubmit={handlers.handleApplicationRequested}
        />,

        [REVIEWING_APPLICATION]: () => <ReviewDetailsPage
            data={loanApplicationDetails}
            onSubmit={handlers.handleApplicationConfirmed}
            onAbort={handlers.handleApplicationCancelled}
        />,

        [REVIEWING_APPLICATION_RESULT]: () => <ApplicationResultPage
            data={loanApplicationDetails}
        />,

        [ERRORED]: () => <ErrorPage />
    }

    return componentsByStatus[workflowStatus]()
}

export default ApplicationPage;
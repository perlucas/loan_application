import { useState } from "react";
import ApplicationFormPage from "../ApplicationFormPage/ApplicationFormPage";
import ReviewDetailsPage from "../ReviewDetailsPage/ReviewDetailsPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import ApplicationResultPage from "../ApplicationResultPage/ApplicationResultPage";

const SUBMITTING_APPLICATION = 'SUBMITTING_APPLICATION'
const REVIEWING_APPLICATION = 'REVIEWING_APPLICATION'
const REVIEWING_APPLICATION_RESULT = 'REVIEWING_APPLICATION_RESULT'

function ApplicationPage() {
    const [workflowStatus, setWorkflowStatus] = useState(SUBMITTING_APPLICATION)

    const [loanApplicationDetails, setLoanApplicationDetails] = useState(null)

    const handlers = {
        handleApplicationRequested: function (data) {
            console.log(data)
            const { amount } = data

            setLoanApplicationDetails({
                token: 'abcd-efgh-123-456',
                company: {
                    name: 'Fake company 1'
                },
                accountingSystem: {
                    name: 'Fake system 1'
                },
                profit: 12300.57,
                amount
            })

            setWorkflowStatus(REVIEWING_APPLICATION)
        },

        handleApplicationConfirmed: function () {
            console.log('confirmation sent!')

            setLoanApplicationDetails(prev => ({
                token: 'abcd-efgh-123-456',
                company: {
                    name: 'Fake company 1'
                },
                accountingSystem: {
                    name: 'Fake system 1'
                },
                profit: 12300.57,
                amount: prev.amount,
                approved: false
            }))

            setWorkflowStatus(REVIEWING_APPLICATION_RESULT)
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
        />
    }

    return componentsByStatus[workflowStatus]()
}

export default ApplicationPage;
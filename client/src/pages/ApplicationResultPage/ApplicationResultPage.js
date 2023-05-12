import Container from "../../layout/Container/Container";
import ApplicationSummary from "../../components/ApplicationSummary/ApplicationSummary";

function ApplicationResultPage(props) {
    const { result } = props.data
    const approved = result === 'APPROVED'

    return <Container links={[
        { path: '/', label: 'Apply for Loan' }
    ]}>
        <article>
            <header>
                <h1>Application Result</h1>
            </header>
            <ApplicationSummary data={props.data} />
            {approved && <div>Your application was <strong>approved</strong> successfully, congratulations!</div>}
            {!approved && <div>Your application was <strong>rejected</strong>. The provided company doesn't meet the minimum criteria.</div>}
        </article >
    </Container>
}

export default ApplicationResultPage;
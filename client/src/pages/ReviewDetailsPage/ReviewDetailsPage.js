import Container from "../../layout/Container/Container";
import ApplicationSummary from "../../components/ApplicationSummary/ApplicationSummary";

function ReviewDetailsPage(props) {

    const handlers = {
        handleFormSubmit: function (evt) {
            evt.preventDefault()
            props.onSubmit()
        },
        handleCancel: function (evt) {
            evt.preventDefault()
            props.onAbort()
        },
    }

    return <Container>
        <article>
            <header>
                <h1>Application Review</h1>
            </header>
            <ApplicationSummary data={props.data} />
            <footer>
                <button type="button" onClick={handlers.handleFormSubmit}>Confirm</button>
                <button className="secondary" type="button" onClick={handlers.handleCancel}>Cancel</button>
            </footer>
        </article>
    </Container>
}

export default ReviewDetailsPage;
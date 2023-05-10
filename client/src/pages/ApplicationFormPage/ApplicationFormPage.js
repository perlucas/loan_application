import ApplicationForm from "../../components/AplicationForm/ApplicationForm";
import Container from "../../layout/Container/Container";

function ApplicationFormPage(props) {
    return <Container
        links={[
            { path: '/company/new', label: 'Register company' }
        ]}
    >
        <ApplicationForm onSubmit={props.onSubmit} />
    </Container>
}

export default ApplicationFormPage;
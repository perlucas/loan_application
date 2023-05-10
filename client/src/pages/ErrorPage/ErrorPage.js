import ErrorCard from "../../components/ErrorCard/ErrorCard";
import Container from "../../layout/Container/Container";

function ErrorPage(props) {
    return <Container>
        <ErrorCard
            message={props.message}
        />
    </Container>
}

export default ErrorPage;
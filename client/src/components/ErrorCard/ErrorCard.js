function ErrorCard(props) {
    const { message = 'We really sorry for the inconvenience :(' } = props

    return <article>
        <header>
            <h1>Ups! Something went wrong</h1>
        </header>
        {message && <div>{message}</div>}
        <footer>
            <a href='/'>Try again</a>
        </footer>
    </article>
}

export default ErrorCard;
function Navbar(props) {
    const { leftLinks, rightLinks } = props

    if (!leftLinks && !rightLinks) {
        return null
    }

    return <nav>
        {renderLinksList(leftLinks)}
        {renderLinksList(rightLinks)}
    </nav>
}

function renderLinksList(linkParams) {
    return <ul>
        {
            linkParams.map(({ label, path }) => <li><a href={path}>{label}</a></li>)
        }
    </ul>
}

export function buildNavbarFromLinks(links) {
    if (!links) {
        return null
    }

    return <Navbar
        leftLinks={links.filter(l => !l.align || l.align === 'left')}
        rightLinks={links.filter(l => l.align === 'right')}
    />
}


export default Navbar
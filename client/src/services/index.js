export function getRequest(url) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(result => result.json())
}

export function postRequest(url, payload) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(result => result.json())
}
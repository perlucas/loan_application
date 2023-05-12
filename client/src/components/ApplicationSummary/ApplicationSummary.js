function ApplicationSummary(props) {
    const {
        company: { name: companyName },
        accountingSystem: { name: accountingSystemName },
        amount
    } = props.data

    return <div className="grid">
        <h2>Summary</h2>
        <ul>
            <li><strong>Company: </strong>{companyName}</li>
            <li><strong>Accounting System: </strong>{accountingSystemName}</li>
            <li><strong>Loan amount: </strong>${amount}</li>
        </ul>
    </div>
}

export default ApplicationSummary;
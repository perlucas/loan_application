# Loan Application System - Backend

## API Definition

## `GET /company`
Example:
```json
HTTP 200
{
    "result": [
        {
            "id": 100,
            "name": "Google",
            "established_at": "2020-01-01"
        }
    ]
}
```
## `POST /company`
Example:
```json
Request body
{
    "name": "Google",
    "established_at": "1995-05-10"    
}

HTTP 200
{
    "result": {
            "id": 100,
            "name": "Google",
            "established_at": "2020-01-01"
        }
}
```

## `GET /accounting-system`
Example:
```json
HTTP 200
{
    "result": [
        {
            "id": 100,
            "name": "XERO"
        }
    ]
}
```

## `POST /loan/request`
Example:
```json
Request body
{
    "company_id": 100,
    "amount": 30000,
    "accounting_system_id": 100
}

HTTP 200
{
    "result": {
        "token": "abc-123",
        "accounting_system": {
            "id": 100,
            "name": "XERO"
        },
        "company": {
            "id": 100,
            "name": "Google"
        },
        "amount": 30000
    }
}

HTTP 400
{
    "error": {
        "code": "INVALID_ARGUMENTS"
    }
}
```

## `POST /loan/confirm`
Example:
```json
Request body
{
    "token": "abc-123"
}

HTTP 200
{
    "result": {
        "id": 200,
        "accounting_system": {
            "id": 100,
            "name": "XERO"
        },
        "company": {
            "id": 100,
            "name": "Google"
        },
        "amount": 30000,
        "approved": true
    }
}

HTTP 500
{
    "error": {
        "code": "UNKNOWN_TOKEN"
    }
}
```
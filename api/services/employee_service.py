from mock_data import employees, employee_history, default_history


def get_all(service: str | None, risk: str | None) -> list:
    result = employees

    if service:
        result = [e for e in result if e["service"] == service]
    if risk:
        result = [e for e in result if e["risk"] == risk]

    return result


def get_by_id(employee_id: str) -> dict | None:
    return next((e for e in employees if e["id"] == employee_id), None)


def get_history(employee_id: str) -> dict:
    history = employee_history.get(employee_id, default_history)
    return {"employee_id": employee_id, "history": history}

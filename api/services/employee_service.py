from mock_data import employees


def get_all(service: str | None, risk: str | None):
    result = employees

    if service:
        result = [emp for emp in result if emp["service"] == service]

    if risk:
        result = [emp for emp in result if emp["risk"] == risk]

    return result


def get_by_id(employee_id: str):
    return next((emp for emp in employees if emp["id"] == employee_id), None)

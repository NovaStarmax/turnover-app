from mock_data import predictions


def get_all(risk: str | None, service_filter: str | None, employees: list):
    result = predictions

    if risk:
        result = [p for p in result if p["risk"] == risk]

    if service_filter:
        # On croise avec les employés pour filtrer par service
        ids_in_service = {e["id"] for e in employees if e["service"] == service_filter}
        result = [p for p in result if p["employee_id"] in ids_in_service]

    return result


def get_by_employee_id(employee_id: str):
    return next((p for p in predictions if p["employee_id"] == employee_id), None)

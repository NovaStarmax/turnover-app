def get_metrics() -> dict:
    # En prod : ces chiffres viendraient de la BDD et de logs réels
    return {
        "status": "ok",
        "requests_24h": 1284,
        "avg_latency_ms": 142,
        "errors_24h": 3,
        "last_batch_date": "2026-02-20",
        "employees_scored": 600,
    }


def get_audit_logs() -> dict:
    logs = [
        {
            "timestamp": "2026-02-20 11:02",
            "actor": "S. Legrand",
            "resource": "GET /predictions?service=Commercial",
            "method": "GET",
        },
        {
            "timestamp": "2026-02-20 10:47",
            "actor": "Mme Y",
            "resource": "PATCH /users/4/role",
            "method": "PATCH",
        },
        {
            "timestamp": "2026-02-20 10:33",
            "actor": "C. Vidal",
            "resource": "GET /predictions/EMP-0421",
            "method": "GET",
        },
        {
            "timestamp": "2026-02-20 09:55",
            "actor": "P. Rousseau",
            "resource": "GET /predictions?service=Commercial",
            "method": "GET",
        },
        {
            "timestamp": "2026-02-20 09:14",
            "actor": "Mme Y",
            "resource": "GET /audit/logs",
            "method": "GET",
        },
        {
            "timestamp": "2026-02-20 06:02",
            "actor": "Système (batch)",
            "resource": "POST /predictions/batch — 600 salariés",
            "method": "POST",
        },
    ]

    return {
        "total": len(logs),
        "logs": logs,
    }

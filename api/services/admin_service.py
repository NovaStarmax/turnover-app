def get_metrics() -> dict:
    return {
        "status": "ok",
        "requests_24h": 1284,
        "avg_latency_ms": 142,
        "errors_24h": 3,
        "last_batch_date": "2026-02-20",
        "employees_scored": 600,
        "turnover_rate": 20,
        "cost_avoided": 84000,
    }


def get_model() -> dict:
    return {
        "version": "v1.2",
        "algorithm": "Random Forest — 150 arbres",
        "trained_at": "14/02/2026",
        "data_range": "jan. 2024 → fév. 2026",
        "recall": 0.84,
        "auc_roc": 0.89,
        "recall_threshold": 0.75,
        "auc_threshold": 0.75,
        "last_evaluation": "20/02/2026",
        "drift_variables": [
            {"label": "Ancienneté", "drift_pct": 3.2, "color": "green"},
            {"label": "Absences (6 mois)", "drift_pct": 8.7, "color": "yellow"},
            {"label": "Temps sans promotion", "drift_pct": 5.1, "color": "green"},
            {"label": "Nb formations", "drift_pct": 22.4, "color": "red"},
        ],
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
    return {"total": len(logs), "logs": logs}

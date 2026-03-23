import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def get_token(email: str, password: str) -> str:
    response = client.post("/auth/login", json={"email": email, "password": password})
    assert response.status_code == 200, f"Login failed for {email}: {response.text}"
    return response.json()["access_token"]


def auth_headers(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_login_success():
    response = client.post(
        "/auth/login", json={"email": "admin@entreprise.fr", "password": "admin123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password():
    response = client.post(
        "/auth/login",
        json={"email": "admin@entreprise.fr", "password": "mauvais_mot_de_passe"},
    )
    assert response.status_code == 401


def test_login_unknown_email():
    response = client.post(
        "/auth/login",
        json={"email": "inconnu@rh-predict.fr", "password": "nimportequoi"},
    )
    assert response.status_code == 401


def test_get_employees_without_token():
    response = client.get("/employees/")
    assert response.status_code == 401


def test_get_employees_with_token():
    token = get_token("admin@entreprise.fr", "admin123")
    response = client.get("/employees/", headers=auth_headers(token))
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_predictions_without_token():
    response = client.get("/predictions/")
    assert response.status_code == 401


def test_get_predictions_with_admin_token():
    token = get_token("admin@entreprise.fr", "admin123")
    response = client.get("/predictions/", headers=auth_headers(token))
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_admin_metrics_as_admin():
    token = get_token("admin@entreprise.fr", "admin123")
    response = client.get("/admin/metrics", headers=auth_headers(token))
    assert response.status_code == 200


def test_get_admin_metrics_as_standard():
    token = get_token("rh@entreprise.fr", "rh123")
    response = client.get("/admin/metrics", headers=auth_headers(token))
    assert response.status_code == 200


def test_get_admin_model_as_standard():
    token = get_token("rh@entreprise.fr", "rh123")
    response = client.get("/admin/model", headers=auth_headers(token))
    assert response.status_code == 403

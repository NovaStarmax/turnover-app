import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def get_token(email: str, password: str) -> str:
    """Récupère un token JWT pour un utilisateur donné."""
    response = client.post("/auth/login", json={"email": email, "password": password})
    assert response.status_code == 200, f"Login failed for {email}: {response.text}"
    return response.json()["access_token"]


def auth_headers(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


# 1. Health Check


def test_health():
    """L'API répond correctement sur /health."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


# 2. Authentification


def test_login_success():
    """Login avec credentials valides retourne un token."""
    response = client.post(
        "/auth/login", json={"email": "admin@entreprise.fr", "password": "admin123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password():
    """Login avec mauvais mot de passe retourne 401."""
    response = client.post(
        "/auth/login",
        json={"email": "admin@entreprise.fr", "password": "mauvais_mot_de_passe"},
    )
    assert response.status_code == 401


def test_login_unknown_email():
    """Login avec email inconnu retourne 401."""
    response = client.post(
        "/auth/login",
        json={"email": "inconnu@rh-predict.fr", "password": "nimportequoi"},
    )
    assert response.status_code == 401


# 3. Employees


def test_get_employees_without_token():
    """Accès à /employees/ sans token retourne 401."""
    response = client.get("/employees/")
    assert response.status_code == 401


def test_get_employees_with_token():
    """Accès à /employees/ avec token valide retourne une liste."""
    token = get_token("admin@entreprise.fr", "admin123")
    response = client.get("/employees/", headers=auth_headers(token))
    assert response.status_code == 200
    assert isinstance(response.json(), list)


# 4. Predictions


def test_get_predictions_without_token():
    """Accès à /predictions/ sans token retourne 401."""
    response = client.get("/predictions/")
    assert response.status_code == 401


def test_get_predictions_with_admin_token():
    """Accès à /predictions/ avec token RH_ADMIN retourne une liste."""
    token = get_token("admin@entreprise.fr", "admin123")
    response = client.get("/predictions/", headers=auth_headers(token))
    assert response.status_code == 200
    assert isinstance(response.json(), list)


# 5. Admin — contrôle des rôles


def test_get_admin_metrics_as_admin():
    """RH_ADMIN peut accéder à /admin/metrics."""
    token = get_token("admin@entreprise.fr", "admin123")
    response = client.get("/admin/metrics", headers=auth_headers(token))
    assert response.status_code == 200


def test_get_admin_metrics_as_standard():
    """RH_STANDARD peut accéder à /admin/metrics (autorisé)."""
    token = get_token("rh@entreprise.fr", "rh123")
    response = client.get("/admin/metrics", headers=auth_headers(token))
    assert response.status_code == 200


def test_get_admin_model_as_standard():
    """RH_STANDARD ne peut PAS accéder à /admin/model (réservé RH_ADMIN)."""
    token = get_token("rh@entreprise.fr", "rh123")
    response = client.get("/admin/model", headers=auth_headers(token))
    assert response.status_code == 403

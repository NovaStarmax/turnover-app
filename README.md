# RH Predict — Employee Turnover Risk Platform

A full-stack HR intelligence platform that uses machine learning to predict employee turnover risk, helping HR teams identify at-risk employees, understand key contributing factors, and take proactive retention actions.

---

## Live Demo

A public demo of the application is available:

🔗 https://turnover-app.starspath-place.fr/

**Demo credentials:**
- Email: admin@entreprise.fr
- Password: admin123

---

## Overview

RH Predict combines a **FastAPI** REST backend, a **React** single-page application, and a **scikit-learn** ML pipeline to deliver interpretable turnover risk scores at scale. Each prediction is backed by SHAP factor analysis, giving HR managers actionable insight rather than a black-box score.

**Key capabilities:**
- Real-time turnover risk scoring (high / medium / low) per employee
- SHAP-based factor breakdown for model interpretability
- Role-based access control (RH Admin, RH Standard, Manager)
- Audit logging and system monitoring dashboard
- ML model health tracking with data drift detection
- Full Docker support for one-command deployment

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.13, FastAPI, Uvicorn, Pydantic v2 |
| Authentication | JWT (python-jose, HS256), OAuth2 Password Bearer |
| Frontend | React 19, Vite 7, Tailwind CSS 4, shadcn/ui |
| ML | scikit-learn, pandas, numpy, scipy, Boruta, SHAP |
| Containerization | Docker, Docker Compose, Nginx (SPA serving) |
| Package management | uv (Python), npm (JS) |

---

## Architecture

```
turnover-project/
├── api/                        # FastAPI backend
│   ├── main.py                 # App entry point, CORS, router registration
│   ├── mock_data.py            # In-memory data (DB integration in progress)
│   ├── routes/                 # auth, employees, predictions, users, admin
│   ├── schemas/                # Pydantic request/response models
│   ├── services/               # Business logic layer
│   └── core/                   # JWT security, dependencies, config
├── frontend/                   # React + Vite SPA
│   └── src/
│       ├── pages/              # Login, Dashboard, Employees, EmployeeProfile, Administration
│       ├── components/         # Feature-organized UI components
│       ├── contexts/           # AuthContext (JWT), ThemeContext (dark mode)
│       └── lib/                # Axios client, API service wrappers
├── ml/                         # ML models and training notebooks
├── db/                         # Alembic migrations (in progress)
├── docker-compose.yml
└── makefile
```

---

## Getting Started

### Prerequisites

- Python 3.13+ with [uv](https://github.com/astral-sh/uv)
- Node.js 20+
- Docker & Docker Compose (optional)

### Local Development

**1. Clone and configure environment**

```bash
git clone https://github.com/NovaStarmax/turnover-project.git
cd turnover-project
cp .env.example .env          # Set SECRET_KEY and CORS_ORIGINS
```

**2. Install dependencies**

```bash
# Backend
uv sync

# Frontend
cd frontend && npm install
```

**3. Run the development servers**

```bash
# Both servers in parallel (recommended)
make dev

# Or individually
make run-back    # FastAPI on http://localhost:8000
make run-front   # Vite dev server on http://localhost:5173
```

### Docker Deployment

```bash
docker-compose up
```

| Service | URL |
|---|---|
| Frontend | http://localhost:80 |
| API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |

---

## API Reference

All endpoints are protected by JWT Bearer authentication unless noted.

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/auth/login` | Login, returns JWT token | Public |
| `POST` | `/auth/register` | Register new user, returns temp password | RH_ADMIN |

### Employees

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/employees/` | List employees (filter: `service`, `risk`) | Authenticated |
| `GET` | `/employees/{id}` | Employee detail | Authenticated |
| `GET` | `/employees/{id}/history` | HR event timeline | Authenticated |

### Predictions

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/predictions/` | All predictions (filter: `risk`, `service`) | RH_ADMIN, RH_STANDARD |
| `GET` | `/predictions/{employee_id}` | Prediction + SHAP factors for one employee | RH_ADMIN, RH_STANDARD |

### Administration

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/admin/metrics` | System metrics (requests, latency, batch info) | RH_ADMIN, RH_STANDARD |
| `GET` | `/admin/model` | ML model metadata and drift report | RH_ADMIN |
| `GET` | `/admin/audit/logs` | User activity audit trail | RH_ADMIN |

### Users

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/users/me` | Current user profile | Authenticated |
| `GET` | `/users/` | All users | RH_ADMIN |
| `PATCH` | `/users/{id}/role` | Update user role | RH_ADMIN |

---

## Role-Based Access Control

| Feature | RH_ADMIN | RH_STANDARD | MANAGER |
|---|:---:|:---:|:---:|
| Employee list & profiles | ✓ | ✓ | ✓ |
| Turnover predictions | ✓ | ✓ | — |
| Dashboard & KPIs | ✓ | ✓ | — |
| System monitoring | ✓ | ✓ | — |
| ML model details | ✓ | — | — |
| Audit logs | ✓ | — | — |
| User management | ✓ | — | — |

---

## Frontend Pages

- **Login** — JWT authentication with role-based redirect on success
- **Dashboard** — KPI cards (high-risk count, turnover rate, cost avoided) and top 5 at-risk employees
- **Employees** — Searchable and filterable employee list with risk badges
- **Employee Profile** — Risk score, SHAP factor breakdown, HR event history timeline
- **Administration** — Tabbed panel: user management, API monitoring, ML model health, audit logs

---

## ML Model

The prediction engine uses a **Random Forest** classifier (150 estimators) trained on historical HR data. Predictions are generated in batch and exposed via the REST API.

**Current model metrics:**

| Metric | Value | Threshold |
|---|---|---|
| Recall | 0.84 | 0.75 |
| AUC-ROC | 0.89 | 0.75 |

**SHAP interpretability** — each prediction includes the top contributing factors (e.g., tenure, absences, time since last promotion, training count), enabling HR teams to understand *why* an employee is flagged as at-risk.

**Data drift monitoring** — the administration panel tracks distribution shifts on key input variables across scoring batches.

---

## Environment Variables

**Backend (`.env`)**

```env
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://localhost:5173
# DATABASE_URL=postgresql://user:password@host:5432/dbname
```

**Frontend**

```env
# .env.development
VITE_API_URL=http://localhost:8000

# .env.production (injected at Docker build time)
VITE_API_URL=https://your-api-domain.com
```

---

## Tests

```bash
uv run pytest
```

The test suite covers authentication flows, protected route enforcement, and role-based authorization.

```
api/tests/test_routes.py
├── Health check
├── Login (success, wrong password, unknown email)
├── Protected routes (with/without token)
└── Role-based access (admin vs. standard)
```

---

## Roadmap

- [x] JWT authentication & role-based access control
- [x] Full REST API (employees, predictions, users, admin)
- [x] React SPA with protected routes and dark mode
- [x] Docker + Nginx production build
- [ ] PostgreSQL integration (SQLAlchemy + Alembic migrations)
- [ ] Password hashing (bcrypt)
- [ ] ML batch scoring pipeline (`POST /predictions/batch`)
- [ ] Expanded test coverage (integration + ML)

---

## License

This project is for educational and portfolio purposes.

# Turnover Project — CLAUDE.md

HR prediction platform that scores employee turnover risk using a FastAPI backend, React frontend, and ML models.

## Commands

```bash
# Development
make run-back        # FastAPI on :8000 (uv run uvicorn main:app --reload)
make run-front       # Vite dev server on :5173
make dev             # Both in parallel

# Docker
docker-compose up    # frontend (:5173/80) + api (:8000)

# Package management — always use uv, never pip directly
uv add <package>
uv run <command>
```

## Architecture

```
turnover-project/
├── api/                    # FastAPI backend
│   ├── main.py             # App entry, CORS, router registration
│   ├── mock_data.py        # Temporary mock data (to be replaced by DB)
│   ├── routes/             # auth.py, employees.py, predictions.py, users.py, admin.py
│   ├── schemas/            # Pydantic models
│   ├── services/           # Business logic
│   └── core/               # Auth, config, dependencies
├── frontend/               # React + Vite (JavaScript, not TypeScript)
│   └── src/
│       ├── pages/          # Login, Dashboard, Employees, EmployeeProfile, Administration
│       ├── components/     # Organized by feature (dashboard/, employees/, layout/, ui/)
│       ├── contexts/       # AuthContext.jsx, ThemeContext.jsx
│       └── lib/            # Utilities
├── ml/                     # ML models and notebooks
├── db/                     # DB migrations (Alembic, future)
└── docker-compose.yml
```

## Stack

- **Backend**: Python 3.13, FastAPI, uvicorn, pydantic, python-jose (JWT), passlib
- **Frontend**: React (JSX), Vite, Tailwind CSS (shadcn/ui components)
- **ML**: scikit-learn, pandas, numpy, scipy, boruta
- **Package manager**: uv (pyproject.toml)
- **Auth**: JWT tokens via python-jose

## Key Conventions

- Backend routes are prefixed: `/auth`, `/employees`, `/predictions`, `/users`, `/admin`
- Mock data in `api/mock_data.py` — will be replaced by SQLAlchemy + real DB
- Frontend uses `AuthContext` to store JWT and attach it to requests
- CORS configured for `http://localhost:5173` only
- Secret key via `SECRET_KEY` env var (docker-compose injects it)

## Roadmap Status

- [x] Étape 1 — Front/back couplés (AuthContext, real fetches, loading/error states, protected routes)
- [x] Étape 3 — Docker (Dockerfiles + docker-compose)
- [ ] Étape 2 — Database (SQLAlchemy models, Alembic migrations, bcrypt passwords)
- [ ] Étape 4 — ML integration, pytest, full README

## CLI

- make run-front
- make run-back

## Roadmap complète jusqu'au final

## 1 Étape 1 — Couplage front/back ← on attaque ça maintenant

- AuthContext React (stocker le JWT, l'envoyer à chaque requête)
- Remplacer les mock data React par de vrais fetch
- Gestion des états de chargement (loading, error)
- Protection des routes React (redirect si pas connecté)

## Étape 2 — Branchement BDD ← quand ton pote est prêt

- SQLAlchemy models
- Repositories
- Migrations Alembic
- Remplacer mock_data.py par de vraies requêtes SQL
- Hashing passwords avec bcrypt

## Étape 3 — Docker ← quand front + back sont couplés et stables

- Dockerfile frontend (Node build → Nginx)
- Dockerfile backend (Python + uvicorn)
- docker-compose.yml (frontend + backend + postgres)
- Variables d'environnement (.env)
- Test end-to-end en containers

## Étape 4 — Finitions

- Branchement modèle ML (scoring batch)
- Tests API (pytest)
- README complet

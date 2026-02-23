## Routes à implémenter

**Auth**
```
POST   /auth/login          → reçoit email + password, retourne JWT
```

**Employés**
```
GET    /employees            → liste paginée (page, limit, service)
GET    /employees/:id        → détail d'un employé
```

**Prédictions / Scores**
```
GET    /predictions          → liste du dernier batch (filtrable par service, risk)
GET    /predictions/:id      → score + facteurs SHAP d'un employé
```

**Utilisateurs**
```
GET    /users/me             → utilisateur connecté
GET    /users                → liste (RH_ADMIN seulement)
PATCH  /users/:id/role       → modifier le rôle (RH_ADMIN seulement)
```

**Admin**
```
GET    /health               → statut API
GET    /metrics              → nb requêtes, latence, date dernier batch
GET    /audit/logs           → journal d'audit
```
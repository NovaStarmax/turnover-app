from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import employees, predictions, auth, users

app = FastAPI(title="RH Predict API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employees.router, prefix="/employees", tags=["Employees"])
app.include_router(predictions.router, prefix="/predictions", tags=["Predictions"])
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/users", tags=["Users"])


@app.get("/health")
def health():
    return {"status": "ok"}

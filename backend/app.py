from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.database import Base, engine
from routes import expense, approval, analytics

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Enterprise AI Business Operations Backend",
    version="0.1.0",
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(expense.router)
app.include_router(approval.router)
app.include_router(analytics.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}
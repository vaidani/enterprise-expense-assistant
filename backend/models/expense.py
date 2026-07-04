from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from services.database import Base
from pydantic import BaseModel
from typing import Optional

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    employee = Column(String, index=True)
    category = Column(String, index=True)
    amount = Column(Float)
    description = Column(String, nullable=True)
    date = Column(String)  # ISO date string for simplicity
    status = Column(String, default="Pending")  # Pending / Approved / Rejected
    created_at = Column(DateTime(timezone=True), server_default=func.now())


# Pydantic schemas ===================

class ExpenseBase(BaseModel):
    employee: str
    category: str
    amount: float
    description: Optional[str] = None
    date: str  # "YYYY-MM-DD"


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseRead(ExpenseBase):
    id: int
    status: str

    class Config:
        orm_mode = True
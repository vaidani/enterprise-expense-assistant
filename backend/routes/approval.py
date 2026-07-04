from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from services.database import get_db
from models.expense import Expense, ExpenseRead

router = APIRouter(prefix="/approvals", tags=["approvals"])


@router.get("/pending", response_model=List[ExpenseRead])
def get_pending_expenses(db: Session = Depends(get_db)):
    expenses = db.query(Expense).filter(Expense.status == "Pending").all()
    return expenses


@router.post("/{expense_id}/approve", response_model=ExpenseRead)
def approve_expense(expense_id: int, db: Session = Depends(get_db)):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    expense.status = "Approved"
    db.commit()
    db.refresh(expense)
    return expense


@router.post("/{expense_id}/reject", response_model=ExpenseRead)
def reject_expense(expense_id: int, db: Session = Depends(get_db)):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    expense.status = "Rejected"
    db.commit()
    db.refresh(expense)
    return expense
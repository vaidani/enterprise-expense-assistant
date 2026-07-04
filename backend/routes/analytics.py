from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from services.database import get_db
from models.expense import Expense

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("")
def get_analytics(db: Session = Depends(get_db)):
    total = db.query(Expense).count()
    pending = db.query(Expense).filter(Expense.status == "Pending").count()
    approved = db.query(Expense).filter(Expense.status == "Approved").count()
    rejected = db.query(Expense).filter(Expense.status == "Rejected").count()

    # Simple ratios
    approval_ratio = (approved / total * 100) if total else 0.0
    rejected_ratio = (rejected / total * 100) if total else 0.0

    return {
        "total_expenses": total,
        "pending": pending,
        "approved": approved,
        "rejected": rejected,
        "approval_ratio": approval_ratio,
        "rejected_ratio": rejected_ratio,
        # Later: monthly spending, category distribution, trends
    }
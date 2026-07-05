# agent.py

# 1. Setup: load .env, read GEMINI_API_KEY, create Gemini client
from dotenv import load_dotenv
import os
from google import genai
from pydantic import BaseModel

# Load variables from .env into environment
load_dotenv()

# Read the Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set in the environment (.env file).")

# Create a Gemini client using the API key
gemini_client = genai.Client(api_key=GEMINI_API_KEY)


# 2. Define an expense structure (fields: employee, amount, category, description, date, expense_id)
class ExpenseApprovalInput(BaseModel):
    employee: str
    amount: float
    category: str
    description: str
    date: str
    expense_id: str


# 3. Implement policy rules (within_limits / over_limit / review_needed)
def evaluate_policy(expense: ExpenseApprovalInput) -> str:
    """
    Simple company policy rules.

    Returns one of:
    - "within_limits"
    - "over_limit"
    - "review_needed"
    """
    # Example rules:
    # - Auto within limits if small meals (< 100)
    if expense.amount < 100 and expense.category.lower() == "meals":
        return "within_limits"

    # - Over limit if amount is very large (> 5000)
    if expense.amount > 5000:
        return "over_limit"

    # - Everything else needs review
    return "review_needed"


# 4. Implement risk rules (risk_level = low / medium / high, fraud_score)
def evaluate_risk(expense: ExpenseApprovalInput) -> tuple[float, str]:
    """
    Simple risk scoring.

    Returns:
    - fraud_score: float between 0 and 1
    - risk_level: "low", "medium", or "high"
    """
    score = 0.1  # base low risk

    # Increase risk for large amounts
    if expense.amount > 1000:
        score = 0.6

    # Very suspicious keywords in description
    suspicious_keywords = ["gift card", "cash", "crypto"]
    if any(k in expense.description.lower() for k in suspicious_keywords):
        score = 0.9

    if score < 0.3:
        level = "low"
    elif score < 0.8:
        level = "medium"
    else:
        level = "high"

    return score, level


# 5. Combine rules to choose ai_decision (auto_approve / reject / needs_review)
def choose_decision(policy_status: str, risk_level: str) -> str:
    """
    Combines policy and risk into a final AI decision.

    Returns one of:
    - "auto_approve"
    - "reject"
    - "needs_review"
    """
    if policy_status == "within_limits" and risk_level == "low":
        return "auto_approve"

    if policy_status == "over_limit" or risk_level == "high":
        return "reject"

    return "needs_review"


# 6. Use Gemini to generate an explanation for the decision (ONLINE)
def generate_explanation(
    expense: ExpenseApprovalInput,
    policy_status: str,
    risk_level: str,
    ai_decision: str,
) -> str:
    """
    Ask Gemini to explain why this decision makes sense.
    """
    prompt = f"""
You are an enterprise expense review assistant.

Expense details:
- Employee: {expense.employee}
- Amount: {expense.amount}
- Category: {expense.category}
- Description: {expense.description}
- Date: {expense.date}

Policy status: {policy_status}
Risk level: {risk_level}
Decision: {ai_decision}

Explain in 3–4 sentences why this decision is appropriate, in clear business language.
"""

    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash",  # online Gemini model
        contents=prompt,
    )
    return getattr(response, "text", "").strip()


# 7. Main function that:
#    - takes one expense JSON/dict
#    - applies steps 3–6
#    - returns a structured result with ai_decision, scores, explanation
def review_expense(expense_dict: dict) -> dict:
    """
    High-level agent function.

    Input:
      expense_dict: dict with keys employee, amount, category, description, date, expense_id

    Output:
      dict with expense fields plus:
        ai_decision, policy_status, fraud_score, risk_level, confidence, explanation
    """
    expense = ExpenseApprovalInput(**expense_dict)

    policy_status = evaluate_policy(expense)
    fraud_score, risk_level = evaluate_risk(expense)
    ai_decision = choose_decision(policy_status, risk_level)
    explanation = generate_explanation(expense, policy_status, risk_level, ai_decision)

    confidence = 0.9 if ai_decision in ("auto_approve", "reject") else 0.7

    return {
        "employee": expense.employee,
        "amount": expense.amount,
        "category": expense.category,
        "description": expense.description,
        "date": expense.date,
        "expense_id": expense.expense_id,
        "ai_decision": ai_decision,
        "policy_status": policy_status,
        "fraud_score": fraud_score,
        "risk_level": risk_level,
        "confidence": confidence,
        "explanation": explanation,
    }


# 8. If this file is run directly:
#    - create the three example expenses (auto, reject, needs_review)
#    - run the agent on each
#    - print the outputs
if __name__ == "__main__":
    examples = [
        {
            "employee": "Alice Smith",
            "amount": 45.0,
            "category": "Meals",
            "description": "Client coffee meeting",
            "date": "2026-07-03",
            "expense_id": "EXP-AUTO-001",
        },
        {
            "employee": "Bob Jones",
            "amount": 7500.0,
            "category": "Equipment",
            "description": "High-end gaming PCs for office",
            "date": "2026-07-03",
            "expense_id": "EXP-REJECT-001",
        },
        {
            "employee": "Cara Lee",
            "amount": 600.0,
            "category": "Travel",
            "description": "Hotel stay during client visit",
            "date": "2026-07-03",
            "expense_id": "EXP-REVIEW-001",
        },
    ]

    for exp in examples:
        result = review_expense(exp)
        print("\n=== Expense:", exp["expense_id"], "===")
        for k, v in result.items():
            print(f"{k}: {v}")
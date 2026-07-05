# workflows/expense_workflow.py

from agents.policy_agent import check_policy
from agents.risk_agent import assess_risk
from agents.decision_agent import decide_action
from agents.explanation_agent import generate_explanation


def run_expense_workflow(expense: dict, gemini_client) -> dict:
    """
    Multi-agent workflow:
      Expense -> Policy Agent -> Risk Agent -> Decision Agent -> Explanation Agent
    """

    policy_status = check_policy(expense)
    fraud_score, risk_level = assess_risk(expense, policy_status)
    ai_decision = decide_action(policy_status, risk_level)
    explanation = generate_explanation(expense, policy_status, risk_level, ai_decision, gemini_client)

    confidence = 0.9 if ai_decision in ("auto_approve", "reject") else 0.7

    return {
        "employee": expense["employee"],
        "amount": expense["amount"],
        "category": expense["category"],
        "description": expense["description"],
        "date": expense["date"],
        "expense_id": expense["expense_id"],
        "ai_decision": ai_decision,
        "policy_status": policy_status,
        "fraud_score": fraud_score,
        "risk_level": risk_level,
        "confidence": confidence,
        "explanation": explanation,
    }
# agents/risk_agent.py

def assess_risk(expense: dict, policy_status: str) -> tuple[float, str]:
    """
    Risk Agent: compute fraud_score and risk_level.
    """
    amount = expense["amount"]
    description = expense["description"].lower()

    score = 0.1  # base low risk

    if amount > 1000:
        score = 0.6

    suspicious_keywords = ["gift card", "cash", "crypto"]
    if any(k in description for k in suspicious_keywords):
        score = 0.9

    if policy_status == "over_limit":
        score = max(score, 0.6)

    if score < 0.3:
        level = "low"
    elif score < 0.8:
        level = "medium"
    else:
        level = "high"

    return score, level
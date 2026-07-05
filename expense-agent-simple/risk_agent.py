# risk_agent.py

def assess_risk(expense, policy_status):
    """
    Risk Agent: compute fraud_score and risk_level.
    Returns fraud_score (float) and risk_level ('low', 'medium', 'high').
    """
    amount = expense["amount"]

    fraud_score = 0.1  # base score

    if policy_status == "over_limit":
        fraud_score += 0.3
    elif policy_status == "review_needed":
        fraud_score += 0.1

    if amount > 5000:
        fraud_score += 0.3
    elif amount > 1000:
        fraud_score += 0.2

    if fraud_score < 0.3:
        risk_level = "low"
    elif fraud_score < 0.6:
        risk_level = "medium"
    else:
        risk_level = "high"

    return fraud_score, risk_level
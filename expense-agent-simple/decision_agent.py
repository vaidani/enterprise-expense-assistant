# decision_agent.py

def decide_action(policy_status, risk_level):
    """
    Decision Agent: combine policy and risk into ai_decision.
    Returns ai_decision: 'auto_approve', 'reject', or 'needs_review'.
    """
    if policy_status == "over_limit":
        return "reject"

    if risk_level == "high":
        return "reject"

    if policy_status == "within_limits" and risk_level == "low":
        return "auto_approve"

    return "needs_review"
# agents/decision_agent.py

def decide_action(policy_status: str, risk_level: str) -> str:
    """
    Decision Agent: combine policy and risk into ai_decision.
    """
    if policy_status == "within_limits" and risk_level == "low":
        return "auto_approve"

    if policy_status == "over_limit" or risk_level == "high":
        return "reject"

    return "needs_review"
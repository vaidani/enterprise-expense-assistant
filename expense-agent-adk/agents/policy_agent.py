# agents/policy_agent.py

def check_policy(expense: dict) -> str:
    """
    Policy Agent: decide if the expense is within limits, over_limit, or review_needed.
    """
    amount = expense["amount"]
    category = expense["category"].lower()

    # Example rules:
    if category == "meals":
        if amount < 100:
            return "within_limits"
        elif amount > 5000:
            return "over_limit"
        else:
            return "review_needed"

    if amount > 5000:
        return "over_limit"

    return "review_needed"
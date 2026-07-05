# policy_agent.py

def check_policy(expense):
    """
    Policy Agent: decide if the expense is within limits, over_limit, or review_needed.
    Returns policy_status as a string.
    """
    amount = expense["amount"]
    category = expense["category"]

    if category == "Meals":
        if amount <= 50:
            return "within_limits"
        elif amount <= 100:
            return "review_needed"
        else:
            return "over_limit"

    if category == "Travel":
        if amount <= 500:
            return "within_limits"
        elif amount <= 1000:
            return "review_needed"
        else:
            return "over_limit"

    if category == "Equipment":
        if amount <= 2000:
            return "within_limits"
        elif amount <= 5000:
            return "review_needed"
        else:
            return "over_limit"

    # Default
    return "review_needed"
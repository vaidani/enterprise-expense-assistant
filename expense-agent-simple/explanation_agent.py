# explanation_agent.py

def generate_explanation(expense, policy_status, risk_level, ai_decision):
    """
    Explanation Agent: creates a human-readable explanation.
    """
    parts = []

    parts.append(
        f"This expense for {expense['description']} incurred by {expense['employee']} "
        f"on {expense['date']} is "
    )

    if policy_status == "within_limits":
        parts.append("well within policy limits for its category and amount. ")
    elif policy_status == "review_needed":
        parts.append("flagged by policy as review_needed for its category or amount. ")
    else:  # over_limit
        parts.append("significantly over the established policy limits for this category. ")

    if risk_level == "low":
        parts.append("The system also identified a low risk level associated with this transaction. ")
    elif risk_level == "medium":
        parts.append("The system identified a medium risk level associated with this transaction. ")
    else:
        parts.append("The system identified a high risk level associated with this transaction. ")

    if ai_decision == "auto_approve":
        parts.append("Therefore, given its compliance and minimal risk, the expense has been automatically approved.")
    elif ai_decision == "reject":
        parts.append("Therefore, due to exceeding policy thresholds and risk considerations, the expense has been rejected.")
    else:  # needs_review
        parts.append("Therefore, a manual review is necessary to ensure full compliance before approval.")

    return "".join(parts)
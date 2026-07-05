# agents/explanation_agent.py

from google import genai  # type hint only; actual client passed from main


def generate_explanation(
    expense: dict,
    policy_status: str,
    risk_level: str,
    ai_decision: str,
    gemini_client: genai.Client,
) -> str:
    """
    Explanation Agent: uses Gemini to explain why the decision makes sense.
    """

    prompt = f"""
You are an enterprise expense review assistant.

Expense details:
- Employee: {expense['employee']}
- Amount: {expense['amount']}
- Category: {expense['category']}
- Description: {expense['description']}
- Date: {expense['date']}

Policy status: {policy_status}
Risk level: {risk_level}
Decision: {ai_decision}

Explain in 3–4 sentences why this decision is appropriate, in clear business language.
"""

    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    return getattr(response, "text", "").strip()
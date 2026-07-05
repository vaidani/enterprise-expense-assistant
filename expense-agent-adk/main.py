# main.py

from dotenv import load_dotenv
import os
from google import genai

from workflows.expense_workflow import run_expense_workflow

# Load .env and create Gemini client
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set in the .env file.")

gemini_client = genai.Client(api_key=GEMINI_API_KEY)


if __name__ == "__main__":
    # Example expenses to test the multi-agent workflow
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
        result = run_expense_workflow(exp, gemini_client)
        print(f"\n=== Expense: {exp['expense_id']} ===")
        for k, v in result.items():
            print(f"{k}: {v}")
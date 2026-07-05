# ExpenseGuard ADK — Multi-Agent Expense Review Assistant

## 1. Overview

ExpenseGuard ADK is a multi-agent AI assistant that helps business teams review employee expenses faster and more consistently. It checks each expense against simple policy rules, assesses risk, chooses an appropriate decision, and uses Gemini to generate a clear business explanation.

This project is built for the **Agents for Business** track of the Kaggle AI Agents: Intensive Vibe Coding Capstone Project.

---

## 2. Problem & Motivation

Manual expense review is:

- Time-consuming for finance and operations teams.
- Inconsistent, as different reviewers may apply policies differently.
- Prone to missed policy violations and unclear rejections.

Typical questions teams ask:

- Is this expense within policy limits?
- Is there any risk or fraud concern?
- Should we auto-approve, reject, or escalate for review?
- How do we explain the decision clearly to employees?

ExpenseGuard ADK addresses these questions with a structured, multi-agent pipeline that automates much of the review process while still allowing human oversight.

---

## 3. Solution Overview

Given an expense with fields:

- `employee`
- `amount`
- `category` (Meals, Travel, Equipment, etc.)
- `description`
- `date`
- `expense_id`

the system:

1. **Checks policy** to categorize the expense as:
   - `within_limits`
   - `over_limit`
   - `review_needed`

2. **Assesses risk**, returning:
   - `fraud_score` (0.0–1.0)
   - `risk_level` (`low`, `medium`, `high`)

3. **Decides an action**:
   - `auto_approve`
   - `reject`
   - `needs_review`

4. **Generates an explanation** using **Gemini 2.5 Flash** in clear, business-friendly language.

The final output is a dictionary containing the original expense fields plus:

- `policy_status`
- `fraud_score`
- `risk_level`
- `ai_decision`
- `confidence`
- `explanation`

---

## 4. Multi-Agent Architecture

ExpenseGuard ADK is organized as a simple multi-agent workflow:

### 4.1 Policy Agent (`agents/policy_agent.py`)

- Role: Enforces high-level company policy.
- Input: `expense` dict.
- Logic (examples):
  - Small Meals under 100 → `within_limits`.
  - Very large amounts over 5000 → `over_limit`.
  - Other cases → `review_needed`.
- Output: `policy_status` string.

### 4.2 Risk Agent (`agents/risk_agent.py`)

- Role: Scores the risk of the expense.
- Input: `expense` and `policy_status`.
- Logic (examples):
  - Higher amounts increase base risk.
  - Suspicious keywords in description (e.g., `"gift card"`, `"cash"`, `"crypto"`) push risk higher.
  - Over-limit policy status can bump risk to at least medium.
- Output:
  - `fraud_score` (float between 0 and 1).
  - `risk_level` (`low`, `medium`, `high`).

### 4.3 Decision Agent (`agents/decision_agent.py`)

- Role: Combines policy and risk into a final decision.
- Input: `policy_status`, `risk_level`.
- Logic:
  - `within_limits` + `low` → `auto_approve`.
  - `over_limit` or `high` risk → `reject`.
  - Other combinations → `needs_review`.
- Output: `ai_decision` string.

### 4.4 Explanation Agent (`agents/explanation_agent.py`)

- Role: Generates human-friendly explanations using Gemini.
- Input: `expense`, `policy_status`, `risk_level`, `ai_decision`, and a Gemini client.
- Logic:
  - Builds a prompt with the expense details and decision context.
  - Calls `gemini-2.5-flash` via the Gemini API.
  - Returns a 3–4 sentence explanation explaining why the decision is appropriate.

### 4.5 Workflow (`workflows/expense_workflow.py`)

- Role: Orchestrates the multi-agent pipeline.
- Flow:
  - Expense → Policy Agent → Risk Agent → Decision Agent → Explanation Agent.
- Output:
  - A combined dictionary with all fields and computed values.

### 4.6 Entry Point (`main.py`)

- Role: Runs the end-to-end workflow for demo purposes.
- Responsibilities:
  - Loads `GEMINI_API_KEY` from `.env`.
  - Creates example expenses (Alice, Bob, Cara).
  - Calls `run_expense_workflow` for each example.
  - Prints the result to the console.

---

## 5. Technologies & Key Concepts

- **Python**: Core implementation language.
- **Gemini API (gemini-2.5-flash)**: Used for generating business explanations.
- **python-dotenv**: Loads environment variables from `.env` safely.
- **Multi-agent system**: Decomposes the solution into Policy, Risk, Decision, and Explanation agents.
- **Security features**:
  - API keys kept in `.env`, not hard-coded.
  - Only relevant expense fields sent to the Gemini API (no passwords or tokens).
- **Deployability**:
  - Can be run via `python main.py` on any machine with Python and a valid Gemini key.
  - Could be wrapped as a simple API or connected to a larger workflow system.

---

## 6. Setup Instructions

### 6.1 Clone or copy the project

Make sure the project directory looks like:

```text
expense-agent-adk/
  agents/
    policy_agent.py
    risk_agent.py
    decision_agent.py
    explanation_agent.py
  workflows/
    expense_workflow.py
  main.py
  README.md
  .env
```

### 6.2 Create and activate a virtual environment (optional)

```bash
cd expense-agent-adk
python -m venv .venv
.\.venv\Scripts\activate
```

### 6.3 Install dependencies

```bash
pip install python-dotenv google-genai
```

(If you use other packages, add them here.)

### 6.4 Configure Gemini API key

In `.env` (at project root), add:

```env
GEMINI_API_KEY=YOUR_REAL_API_KEY_HERE
```

Do **not** commit `.env` or your key to public repositories.

---

## 7. How to Run the Demo

From the project root:

```bash
python main.py
```

This will:

1. Load the Gemini client using `GEMINI_API_KEY`.
2. Create three example expenses:
   - Alice Smith – small Meals, likely `auto_approve`.
   - Bob Jones – large Equipment, likely `reject`.
   - Cara Lee – Travel hotel stay, likely `needs_review`.
3. Run the multi-agent workflow for each expense.
4. Print the full result, including policy status, risk, AI decision, confidence, and explanation.

Example output (fields):

- `employee`
- `amount`
- `category`
- `description`
- `date`
- `expense_id`
- `policy_status`
- `fraud_score`
- `risk_level`
- `ai_decision`
- `confidence`
- `explanation`

---

## 8. Security & Data Handling

- API keys are stored in `.env` and loaded via `python-dotenv`.
- No secrets or keys are checked into source code.
- Only necessary expense fields are passed in the Gemini prompt.
- This project is safe to share publicly as long as `.env` is kept private.

---

## 9. Future Extensions

Possible improvements:

- Connect to a real expense system (ERP, HR tools) to review live data.
- Add configurable policy and risk rules per company or department.
- Introduce a manager approval loop for `needs_review` decisions.
- Wrap the multi-agent workflow in a full ADK/Cloud deployment with monitoring.
- Add more tools (e.g., database lookups, vendor history) as additional agents.

---

## 10. Capstone Notes

This project demonstrates:

- **Agent / Multi-agent system**: Distinct agents for policy, risk, decision, and explanation, orchestrated via a workflow.
- **Security features**: Safe handling of API keys and limited data sharing with the model.
- **Deployability**: Straightforward to run locally and ready to be wrapped as a backend service or integrated into a larger system.

It is intended for the **Agents for Business** track in the Kaggle AI Agents: Intensive Vibe Coding Capstone Project.
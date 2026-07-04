// Matches FastAPI ExpenseRead schema
export type ExpenseStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Expense {
  id: number;
  employee: string;
  category: string;
  amount: number;
  description?: string | null;
  date: string;     // "YYYY-MM-DD"
  status: ExpenseStatus;
}

// For creating a new expense
export interface ExpenseCreate {
  employee: string;
  category: string;
  amount: number;
  description?: string;
  date: string;
}

// Analytics response from GET /analytics
export interface AnalyticsSummary {
  total_expenses: number;
  pending: number;
  approved: number;
  rejected: number;
  approval_ratio: number;
  rejected_ratio: number;
}
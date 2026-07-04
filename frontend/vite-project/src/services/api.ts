import axios from 'axios';
import type { Expense, ExpenseCreate, AnalyticsSummary } from '../types/expense';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// Expenses =======================

export async function getExpenses(): Promise<Expense[]> {
  const res = await api.get<Expense[]>('/expenses');
  return res.data;
}

export async function createExpense(payload: ExpenseCreate): Promise<Expense> {
  const res = await api.post<Expense>('/expenses', payload);
  return res.data;
}

export async function deleteExpense(id: number): Promise<void> {
  await api.delete(`/expenses/${id}`);
}

// Approvals =======================

export async function getPendingExpenses(): Promise<Expense[]> {
  const res = await api.get<Expense[]>('/approvals/pending');
  return res.data;
}

export async function approveExpense(id: number): Promise<Expense> {
  const res = await api.post<Expense>(`/approvals/${id}/approve`);
  return res.data;
}

export async function rejectExpense(id: number): Promise<Expense> {
  const res = await api.post<Expense>(`/approvals/${id}/reject`);
  return res.data;
}

// Analytics =======================

export async function getAnalytics(): Promise<AnalyticsSummary> {
  const res = await api.get<AnalyticsSummary>('/analytics');
  return res.data;
}

// Health ==========================

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await api.get<{ status: string }>('/health');
    return res.data.status === 'ok';
  } catch {
    return false;
  }
}
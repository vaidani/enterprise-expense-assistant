import { useEffect, useState } from 'react';
import { getExpenses, deleteExpense } from '../services/api';
import type { Expense } from '../types/expense';

const statusColor: Record<string, string> = {
  Pending: 'bg-amber-500/20 text-amber-300',
  Approved: 'bg-emerald-500/20 text-emerald-300',
  Rejected: 'bg-rose-500/20 text-rose-300',
};

const ExpenseHistoryTable = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load expenses', err);
      setError('Failed to load expenses from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this expense?')) return;
    try {
      await deleteExpense(id);
      await loadExpenses();
    } catch (err) {
      console.error('Failed to delete expense', err);
      alert('Failed to delete expense.');
    }
  };

  return (
    <div className="rounded-lg bg-slate-900 border border-slate-800 p-4 mt-4">
      <h3 className="text-sm font-semibold text-slate-200 mb-3">
        Expense List
      </h3>

      {loading && (
        <div className="text-xs text-slate-400">Loading expenses...</div>
      )}
      {error && (
        <div className="text-xs text-rose-400">{error}</div>
      )}

      {!loading && !error && expenses.length === 0 && (
        <div className="text-xs text-slate-400">
          No expenses found. Submit a new expense above.
        </div>
      )}

      {!loading && !error && expenses.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-800">
                <th className="py-2 pr-4">Employee</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => (
                <tr key={expense.id} className="border-b border-slate-800/60">
                  <td className="py-2 pr-4 text-slate-200">
                    {expense.employee}
                  </td>
                  <td className="py-2 pr-4 text-slate-200">
                    {expense.category}
                  </td>
                  <td className="py-2 pr-4 text-slate-200">
                    ₹{expense.amount.toLocaleString()}
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        statusColor[expense.status] ?? 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {expense.status}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-slate-200">
                    {expense.date}
                  </td>
                  <td className="py-2 pr-4">
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-xs text-rose-400 hover:text-rose-300"
                    >
                      Delete
                    </button>
                    {/* Approve/Reject buttons will live mainly in PendingApprovals */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseHistoryTable;
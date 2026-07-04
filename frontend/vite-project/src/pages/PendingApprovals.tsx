import { useEffect, useState } from 'react';
import { getPendingExpenses, approveExpense, rejectExpense } from '../services/api';
import type { Expense } from '../types/expense';

const PendingApprovals = () => {
  const [pending, setPending] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPending = async () => {
    try {
      setLoading(true);
      const data = await getPendingExpenses();
      setPending(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load pending approvals', err);
      setError('Failed to load pending approvals from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await approveExpense(id);
      await loadPending();
    } catch (err) {
      console.error('Failed to approve expense', err);
      alert('Failed to approve expense.');
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectExpense(id);
      await loadPending();
    } catch (err) {
      console.error('Failed to reject expense', err);
      alert('Failed to reject expense.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Pending Approvals</h2>
      <p className="text-sm text-slate-400">
        Manager view of expenses waiting for approval. This is the human-in-the-loop step for the AI agent.
      </p>

      {loading && (
        <div className="text-xs text-slate-400">Loading pending approvals...</div>
      )}
      {error && (
        <div className="text-xs text-rose-400">{error}</div>
      )}

      {!loading && !error && pending.length === 0 && (
        <div className="text-xs text-slate-400">
          No pending approvals. All expenses are processed.
        </div>
      )}

      {!loading && !error && pending.length > 0 && (
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-slate-800">
                  <th className="py-2 pr-4">Employee</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Description</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.map(expense => (
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
                    <td className="py-2 pr-4 text-slate-200">
                      {expense.description}
                    </td>
                    <td className="py-2 pr-4 text-slate-200">
                      {expense.date}
                    </td>
                    <td className="py-2 pr-4">
                      <button
                        onClick={() => handleApprove(expense.id)}
                        className="mr-3 text-xs text-emerald-400 hover:text-emerald-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(expense.id)}
                        className="text-xs text-rose-400 hover:text-rose-300"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;
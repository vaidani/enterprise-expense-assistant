import { useState } from 'react';
import { createExpense } from '../services/api';
import type { ExpenseCreate } from '../types/expense';

interface ExpenseFormProps {
  onSubmitted?: () => void; // parent can refresh list after submit
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmitted }) => {
  const [form, setForm] = useState<ExpenseCreate>({
    employee: '',
    category: '',
    amount: 0,
    description: '',
    date: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!form.employee || !form.category || !form.date || !form.amount) {
        setError('Please fill in Employee, Category, Date, and Amount.');
        setLoading(false);
        return;
      }

      await createExpense(form);
      setSuccess('Expense submitted successfully.');
      setForm({
        employee: '',
        category: '',
        amount: 0,
        description: '',
        date: '',
      });

      if (onSubmitted) {
        onSubmitted();
      }
    } catch (err) {
      console.error('Failed to create expense', err);
      setError('Failed to submit expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
      <h3 className="text-sm font-semibold text-slate-200 mb-3">
        Add Expense
      </h3>

      {error && (
        <div className="mb-2 text-xs text-rose-400">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-2 text-xs text-emerald-400">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400">Employee</label>
          <input
            type="text"
            name="employee"
            value={form.employee}
            onChange={handleChange}
            className="rounded-md bg-slate-800 border border-slate-700 px-2 py-1 text-sm text-slate-100"
            placeholder="Lakshmi"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="rounded-md bg-slate-800 border border-slate-700 px-2 py-1 text-sm text-slate-100"
          >
            <option value="">Select category</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Office">Office</option>
            <option value="Training">Training</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="rounded-md bg-slate-800 border border-slate-700 px-2 py-1 text-sm text-slate-100"
            placeholder="5000"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="rounded-md bg-slate-800 border border-slate-700 px-2 py-1 text-sm text-slate-100"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-xs text-slate-400">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="rounded-md bg-slate-800 border border-slate-700 px-2 py-1 text-sm text-slate-100"
            placeholder="Client meeting, taxi, lunch, etc."
            rows={2}
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
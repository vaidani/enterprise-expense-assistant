import { useEffect, useState } from 'react';
import { getAnalytics } from '../services/api';
import type { AnalyticsSummary } from '../types/expense';

const Analytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getAnalytics();
        setAnalytics(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load analytics', err);
        setError('Failed to load analytics from backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Analytics</h2>
      <p className="text-sm text-slate-400">
        Visual overview of expenses, approvals, and trends.
      </p>

      {loading && (
        <div className="text-xs text-slate-400">
          Loading analytics...
        </div>
      )}
      {error && (
        <div className="text-xs text-rose-400">
          {error}
        </div>
      )}

      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3">
            <div className="text-xs text-slate-400">Total Expenses</div>
            <div className="text-lg font-semibold">
              {analytics.total_expenses}
            </div>
          </div>
          <div className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3">
            <div className="text-xs text-slate-400">Pending</div>
            <div className="text-lg font-semibold">
              {analytics.pending}
            </div>
          </div>
          <div className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3">
            <div className="text-xs text-slate-400">Approved</div>
            <div className="text-lg font-semibold">
              {analytics.approved}
            </div>
          </div>
          <div className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3">
            <div className="text-xs text-slate-400">Rejected</div>
            <div className="text-lg font-semibold">
              {analytics.rejected}
            </div>
          </div>
        </div>
      )}

      {/* Charts will come later using Recharts */}
      <div className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3">
        <div className="text-sm font-semibold text-slate-200 mb-2">
          Charts coming next
        </div>
        <div className="text-xs text-slate-400">
          We'll add interactive charts here using Recharts to show trends and category breakdown.
        </div>
      </div>
    </div>
  );
};

export default Analytics;
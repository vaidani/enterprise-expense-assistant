import { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import { getAnalytics } from '../services/api';
import type { AnalyticsSummary } from '../types/expense';

const Dashboard = () => {
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
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <p className="text-sm text-slate-400">
        Overview of expenses, approvals, and AI decisions (live data from backend).
      </p>

      {/* Loading / error */}
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

      {/* Summary cards */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            label="Total Expenses"
            value={analytics.total_expenses}
          />
          <SummaryCard
            label="Pending Approvals"
            value={analytics.pending}
          />
          <SummaryCard
            label="Approved"
            value={analytics.approved}
          />
          <SummaryCard
            label="Rejected"
            value={analytics.rejected}
          />
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">
          Recent Activity
        </h3>
        <div className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-slate-300">
          This section will later show recent expense submissions and approvals.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
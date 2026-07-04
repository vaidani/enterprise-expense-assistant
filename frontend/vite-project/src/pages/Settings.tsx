const Settings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Settings</h2>
      <p className="text-sm text-slate-400">
        Configuration for backend, environment, and upcoming AI agent integration.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-200 mb-2">
            Environment
          </h3>
          <p className="text-xs text-slate-400">
            Mode: Local Development
          </p>
          <p className="text-xs text-slate-400">
            Backend URL: http://127.0.0.1:8000
          </p>
          <p className="text-xs text-slate-400">
            Frontend URL: http://localhost:5173
          </p>
        </div>

        <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-200 mb-2">
            Google Cloud (Placeholder)
          </h3>
          <p className="text-xs text-slate-400">
            Project ID: (to be configured in Phase 5)
          </p>
          <p className="text-xs text-slate-400">
            Agent Runtime ID: (Phase 5)
          </p>
          <p className="text-xs text-slate-400">
            Gemini Model: (Phase 4/5)
          </p>
        </div>

        <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-200 mb-2">
            User Profile
          </h3>
          <p className="text-xs text-slate-400">
            Name: Lakshmi
          </p>
          <p className="text-xs text-slate-400">
            Role: Manager
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
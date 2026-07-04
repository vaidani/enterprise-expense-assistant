import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Clock,
  BarChart3,
  Settings as SettingsIcon,
} from 'lucide-react';

const Sidebar = () => {
  const base =
    'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors';
  const active = 'bg-slate-800 text-white';
  const inactive = 'text-slate-300 hover:bg-slate-800/60 hover:text-white';

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="px-4 py-4 border-b border-slate-800">
        <div className="text-sm font-semibold text-slate-200">
          Enterprise AI Assistant
        </div>
        <div className="text-xs text-slate-400">Business Operations</div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/expenses"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          <FileText className="w-4 h-4" />
          <span>Expenses</span>
        </NavLink>

        <NavLink
          to="/pending"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          <Clock className="w-4 h-4" />
          <span>Pending Approvals</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
        >
          <SettingsIcon className="w-4 h-4" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
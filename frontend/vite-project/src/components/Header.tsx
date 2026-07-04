const Header = () => {
  return (
    <header className="border-b border-slate-800 px-6 py-3 flex items-center justify-between bg-slate-950/80 backdrop-blur">
      <div>
        <h1 className="text-lg font-semibold">
          Enterprise AI Business Operations Assistant
        </h1>
        <p className="text-xs text-slate-400">
          AI-powered workflows for expenses, leave, travel, and purchases.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400">Welcome, Lakshmi</span>
        <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
          LV
        </div>
      </div>
    </header>
  );
};

export default Header;
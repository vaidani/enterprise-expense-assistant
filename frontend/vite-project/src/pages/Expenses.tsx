import ExpenseForm from '../components/ExpenseForm';
import ExpenseHistoryTable from '../components/ExpenseHistoryTable';

const Expenses = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Expenses</h2>
      <p className="text-sm text-slate-400">
        Submit new business expenses and review historical records.
      </p>

      <ExpenseForm onSubmitted={() => {
        // We rely on ExpenseHistoryTable's own useEffect + reload logic.
        // If you prefer, we can move loadExpenses logic up and pass down via props.
      }} />

      <ExpenseHistoryTable />
    </div>
  );
};

export default Expenses;
interface SummaryCardProps {
  label: string;
  value: string | number;
  accent?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, accent }) => {
  return (
    <div className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 flex flex-col gap-1">
      <span className="text-xs text-slate-400">{label}</span>
      <span className="text-lg font-semibold">
        {value}
      </span>
      {accent && (
        <span className="text-xs text-slate-400">
          {accent}
        </span>
      )}
    </div>
  );
};

export default SummaryCard;
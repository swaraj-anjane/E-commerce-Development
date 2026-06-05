const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[120px] flex flex-col justify-center">
      <h3 className="text-slate-400 text-sm mb-2">{title}</h3>

      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
};

export default StatsCard;

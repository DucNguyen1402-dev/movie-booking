export default function MetricCard({hoverClasses, title, iconBackground, iconClassName, Icon, metric, descs}) {
  return (
    <div
  
      className={`flex flex-col justify-between rounded-xl border border-gray-800 bg-[#1e1e1e] p-6 transition-all duration-300 hover:shadow-lg ${hoverClasses}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-400 uppercase">
          {title}
        </span>

        <div
          className={`flex h-13 w-13 items-center justify-center rounded-xl ${iconBackground}`}
        >
          <Icon className={`h-7 w-7 ${iconClassName}`} />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <h3 className="text-3xl font-bold tracking-tight text-white">
          {metric}
        </h3>

        <p className="text-sm text-gray-500">{descs}</p>
      </div>
    </div>
  );
}

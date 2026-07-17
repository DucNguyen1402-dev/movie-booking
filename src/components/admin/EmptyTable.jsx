import { SearchX } from "lucide-react";

export default function EmptyTable({
  title,
  description,
  colSpan,
  icon: Icon = SearchX,
  children,
}) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex flex-col items-center justify-center gap-6 py-24 border-t border-slate-700">
          <div className="flex size-24 items-center justify-center rounded-full bg-slate-700/30">
            <Icon className="size-14 text-slate-400" />
          </div>

          <div className="space-y-3 text-center">
            <h3 className="text-2xl font-semibold text-slate-100">{title}</h3>

            {description && (
              <p className="max-w-md text-[15px] leading-6 text-slate-400">
                {description}
              </p>
            )}

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </td>
    </tr>
  );
}

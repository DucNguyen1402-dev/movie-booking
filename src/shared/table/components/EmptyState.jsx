import { cn } from "@shared/utils";
import { X } from "lucide-react";

const EmptyState = ({
  icon: Icon = X,
  children,
  containerClassName,
  iconWrapperClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
  title,
  description,
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center gap-6 border-t border-slate-700 py-24",
      containerClassName,
    )}
  >
    <div
      className={cn(
        "flex size-24 items-center justify-center rounded-full bg-slate-700/30",
        iconWrapperClassName,
      )}
    >
      <Icon className={cn("size-3/5 text-slate-400", iconClassName)} />
    </div>

    <div className="space-y-3 text-center">
      <h3
        className={cn("text-2xl font-semibold text-slate-100", titleClassName)}
      >
        {title}
      </h3>

      {description && (
        <p
          className={cn(
            "max-w-md text-[15px] leading-6 text-slate-400",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}

      <div className="mt-8">{children}</div>
    </div>
  </div>
);

export default EmptyState;

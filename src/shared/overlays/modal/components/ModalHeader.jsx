import { cn } from "@utils/shared";

const TITLE_SIZE_CLASSES = {
  md: "text-lg",
  sm: "text-base",
  lg: "text-xl",
};

const ModalHeader = ({ title, subtitle, titleSize = "md" }) => (
  <div>
    {title && (
      <h2
        className={cn(
          "font-semibold wrap-break-word text-slate-50 uppercase",
          TITLE_SIZE_CLASSES[titleSize],
        )}
      >
        {title}
      </h2>
    )}
    {subtitle && <p className="mt-3.5 text-sm text-slate-200">{subtitle}</p>}
  </div>
);

export default ModalHeader;

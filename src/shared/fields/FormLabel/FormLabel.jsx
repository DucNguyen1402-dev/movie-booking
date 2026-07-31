import { cn } from "@shared/utils";

const FormLabel = ({ htmlFor, children, required = false, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block w-fit cursor-pointer text-sm font-medium tracking-wider text-slate-200",
        className,
      )}
    >
      {children}
      {required && <span className="ml-1.5 text-red-400">*</span>}
    </label>
  );
};

export default FormLabel;

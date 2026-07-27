const FormLabel = ({ htmlFor, children, required = false, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block w-fit text-sm font-medium tracking-wider text-slate-200 ${className} cursor-pointer`}
    >
      {children}
      {required && <span className="ml-1.5 text-red-400">*</span>}
    </label>
  );
};

export default FormLabel;

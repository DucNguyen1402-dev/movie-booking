import { Input2 } from "@components/admin/ui/form";

const InputField = ({
  register,
  name,
  rules,

  error,
  ...props
}) => {
  return (
    <>
      <Input2 {...register(name, rules)} {...props} />
      {error && (
        <p className="rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
          {error.message}
        </p>
      )}
    </>
  );
};

export default InputField;

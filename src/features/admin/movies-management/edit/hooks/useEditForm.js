import { useForm } from "react-hook-form";

export function useEditForm() {
  const {
    register,
    trigger,
    reset,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues:{}
  });

  return {
    register,
    reset,
    trigger,
    getValues,
    errors,
    watch,
    setValue
  };
}

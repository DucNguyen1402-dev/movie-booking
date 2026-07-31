import { useForm } from "react-hook-form";

export function useShowtimeForm() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty },
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  return {
    register,
    handleSubmit,
    errors,
    control,
    watch,
    isDirty
  };
}

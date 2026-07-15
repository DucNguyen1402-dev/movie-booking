import { useForm } from "react-hook-form";

export function useEditForm() {
  const {
    register,
    trigger,
    reset,
    getValues,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      hot: false,
      sapChieu: false,
      dangChieu: false
    },
  });

 

  return {
    register,
    reset,
    trigger,
    getValues,
    errors,
    watch,
    setValue,
    control,
  };
}

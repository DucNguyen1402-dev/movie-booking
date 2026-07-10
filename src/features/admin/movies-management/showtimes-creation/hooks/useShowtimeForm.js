import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function useShowtimeForm() {
   const { control, handleSubmit, register,  formState: { errors }, watch } = useForm({
    mode: "onBlur",
    defaultValues: {}
   }
   );


  return {
    register,
    handleSubmit,
    errors,
    control,
    watch,
  };
}

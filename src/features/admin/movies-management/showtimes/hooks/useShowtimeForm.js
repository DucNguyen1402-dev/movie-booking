import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function useShowtimeForm({ movie }) {
   const { control, handleSubmit, register,  formState: { errors }, watch , getValues} = useForm({
    mode: "onBlur",
    defaultValues: movie
   }
   );


  return {
    register,
    handleSubmit,
    errors,
    control,
    watch,
    getValues
  };
}

import { useForm } from "react-hook-form";

import { EMPTY_MOVIE } from "@features/admin/movies/edit/constants";
export function useEditForm() {
  const {
    register,
    trigger,
    reset,
    getValues,
    watch,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: EMPTY_MOVIE,
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
    isDirty,
  };
}

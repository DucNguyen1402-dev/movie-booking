import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function useShowtimeForm({ movie }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  useEffect(() => {
    if (!movie) return;

    reset(movie);
  }, [movie]);

  return {
    register,
    handleSubmit,
    errors,
    watch,
    reset
  };
}

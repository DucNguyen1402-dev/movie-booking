import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function useShowtimeForm({ movie }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: movie,
  });

  useEffect(() => {
    if (!movie) return;

    reset(movie);
  }, [movie]);

  return {
    register,
    handleSubmit,
    errors,
  };
}

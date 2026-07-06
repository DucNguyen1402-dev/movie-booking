import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMovie } from "@services/admin/api";
import {
  setModalState,
  setConfirmUpdate,
  setUpdateState,
} from "@features/admin/movie-management/redux/slice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export function useUpdateMovie() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });

      dispatch(setModalState({ type: null }));
      navigate("/admin/movies", {
        state: {
          updatedMovieId: id,
        },
      });
      dispatch(
        setUpdateState({
          type: "success",
          message: "update successfully",
        }),
      );

      setTimeout(() => {
        dispatch(setUpdateState({ type: null, message: null }));
        dispatch(setConfirmUpdate(false));
      }, 2500);
    },
    onError: (error) => {
      dispatch(setModalState({ type: null }));
      dispatch(
        setUpdateState({
          type: "error",
          message: error.response?.data?.content,
        }),
      );
      setTimeout(() => {
        dispatch(setUpdateState({ type: null, message: null }));
        dispatch(setConfirmUpdate(false));
      }, 2500);
    },
  });
}

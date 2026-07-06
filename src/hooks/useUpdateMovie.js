import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMovie } from "@services/admin/api";
import {
  setModalState,
  setConfirmUpdate,
} from "@features/admin/movie-management/redux/slice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "@contexts/admin/Notification/NotificationContext";

export function useUpdateMovie() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const reduxDispatch = useDispatch();
  const navigate = useNavigate();

  const { dispatch: notificationDispatch } = useNotification();

  return useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });

      reduxDispatch(setModalState({ type: null }));
      navigate("/admin/movies", {
        state: {
          updatedMovieId: id,
        },
      });

      notificationDispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          type: "success",
          message: "update successfully",
        },
      });

      setTimeout(() => {
        notificationDispatch({ type: "HIDE_NOTIFICATION" });
        reduxDispatch(setConfirmUpdate(false));
      }, 2500);
    },
    onError: (error) => {
      reduxDispatch(setModalState({ type: null }));
      notificationDispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          type: "error",
          message: error.response?.data?.content,
        },
      });
      setTimeout(() => {
        notificationDispatch({ type: "HIDE_NOTIFICATION" });
        reduxDispatch(setConfirmUpdate(false));
      }, 2500);
    },
  });
}

import { selectModalState } from "@features/admin/movie-management/redux/selectors";
import { useSelector } from "react-redux";
import { useProcessedMovies } from "@features/admin/movie-management/hooks/useProcessedMovies";
import { setModalState } from "@features/admin/movie-management/redux/slice";
import { useDispatch } from "react-redux";
import { useDeleteMovie } from "@hooks/useDeleteMovie";

export default function DeleteModal() {
  const movies = useProcessedMovies();
  const {data: deleteId} = useSelector(selectModalState);
  const targetDeletion = movies.find((movie) => movie.maPhim === deleteId);

  const dispatch = useDispatch();

  const onCancel = () => dispatch(setModalState({type: null, data: null}));

  const deleteMutation = useDeleteMovie();

  const onConfirm = () => {
    deleteMutation.mutate(deleteId);
    dispatch(setModalState({type: null, data: null}));
  };

  return (
    <div className="z-100 flex max-w-90 flex-col gap-3 rounded-xl border border-gray-300 bg-white p-6 text-slate-900">
      <h2 className="text-lg font-bold tracking-wider">Delete Confirmation</h2>
      <div className="space-y-2 text-sm text-gray-500">
        <p>
          Are you sure you want to delete the movie "{targetDeletion.tenPhim}"?
        </p>
        <p>This action cannot be undone.</p>
      </div>

      <div className="mt-3 flex w-full items-center justify-center gap-2">
        <button
          className="grow cursor-pointer rounded-md border border-gray-300 bg-gray-100 py-1.5 text-sm transition-colors duration-300 hover:bg-gray-200"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="grow cursor-pointer rounded-md border-none bg-rose-500 py-1.5 text-sm text-white transition-colors duration-300 hover:bg-rose-600"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

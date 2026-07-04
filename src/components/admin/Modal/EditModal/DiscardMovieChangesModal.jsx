import {setModalState} from "@features/admin/movie-management/redux/slice";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";



export default function DiscardChangesModal() {


  const navigate = useNavigate();

  const dispatch = useDispatch();
const onContinueClick = () => dispatch(setModalState({type: null}));
const onDiscardChange = () =>{
  dispatch(setModalState({type: null}));
  navigate("/admin/movies")
}
  return (
    <div className="z-100 flex max-w-90 flex-col gap-3 rounded-xl border border-gray-300 bg-white p-6 text-slate-900">
      <h2 className="text-lg font-semibold">
        Discard changes?
      </h2>

      <p className="text-sm text-slate-500">
        You have unsaved changes. If you leave now, your edits will be lost.
      </p>

      <div className="mt-3 flex justify-end gap-3">
        <button
          className="rounded-lg border border-gray-300 px-4 py-2 text-slate-700 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-slate-600 cursor-pointer duration-300"
          onClick = {onContinueClick}
        >
          Continue editing
        </button>

        <button
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-700 cursor-pointer"
          onClick ={onDiscardChange}
        >
          Discard
        </button>
      </div>
    </div>
  );
}
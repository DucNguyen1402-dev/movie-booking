import { useEditMovieContext } from "@features/admin/movies/edit/contexts";

export default function HeaderContent() {
  const {
    editForm: { watch },
  } = useEditMovieContext();

  return (
    <div className="mb-6 flex-1 tracking-wider">
      <h1 className="text-3xl font-bold">Thông tin phim</h1>

      <p className="mt-2 text-sm text-slate-400">
        Mã phim:{" "}
        <span className="font-medium text-yellow-500">#{watch("maPhim")}</span>
      </p>
    </div>
  );
}

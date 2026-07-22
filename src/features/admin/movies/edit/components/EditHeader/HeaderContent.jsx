import { useEditMovieContext } from "@features/admin/movies/edit/contexts";

export default function HeaderContent({movieId, groupId}) {
    const { editForm: {watch} } = useEditMovieContext();

  return (
    <div className="mb-6 flex-1 space-y-2">
      <h1 className="text-3xl font-bold">Thông tin phim</h1>
      <p className="space-x-2 text-sm">
        <span>Mã phim:</span>
        <span className="text-yellow-500">#{watch("maPhim")}</span>{" "}
        <span>| Nhóm: {watch("maNhom")}</span>
      </p>
    </div>
  );
}

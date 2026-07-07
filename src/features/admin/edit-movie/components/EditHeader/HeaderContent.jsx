import { useEditMovie } from "../../context/EditContext";

export default function HeaderContent({movieId, groupId}) {
    const { editStates } = useEditMovie();

  return (
    <div className="mb-6 flex-1 space-y-2">
      <h1 className="text-3xl font-bold">Chỉnh Sửa Phim</h1>
      <p className="space-x-2 text-sm">
        <span>Mã phim:</span>{" "}
        <span className="text-yellow-500">#{editStates.movie.maPhim}</span>{" "}
        <span>| Nhóm: {editStates.movie.maNhom}</span>
      </p>
    </div>
  );
}

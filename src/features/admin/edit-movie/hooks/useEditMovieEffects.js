import { useEffect } from "react";

export function useEditMovieEffects({
  editMovie,
  setMovie,
  setImgPreview,
}) {
  useEffect(() => {
    if (!editMovie) return;

    setMovie({
      ...editMovie,
      ngayKhoiChieu: editMovie.ngayKhoiChieu.split("T")[0],
    });
    setImgPreview(editMovie.hinhAnh);
  }, [editMovie, setMovie, setImgPreview]);

}

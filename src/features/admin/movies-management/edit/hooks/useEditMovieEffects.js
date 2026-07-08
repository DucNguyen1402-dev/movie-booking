import { useEffect } from "react";

export function useEditMovieEffects({
  editMovie,
  formReset
}) {
  useEffect(() => {
    if (!editMovie) return;
    formReset({
      ...editMovie,
      ngayKhoiChieu: editMovie.ngayKhoiChieu.split("T")[0],
    });
  }, [editMovie, formReset]);

}

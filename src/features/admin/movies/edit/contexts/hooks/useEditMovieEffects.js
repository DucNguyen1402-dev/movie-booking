import { useEffect, useRef } from "react";

export function useEditMovieEffects({ editMovie, formReset }) {
  const lastMovieId = useRef(null);

  useEffect(() => {
    if (!editMovie || lastMovieId.current === editMovie.maPhim) return;

    formReset({
      ...editMovie,
      ngayKhoiChieu: editMovie.ngayKhoiChieu.split("T")[0],
    });
    lastMovieId.current = editMovie.maPhim;
  }, [editMovie, formReset]);
}

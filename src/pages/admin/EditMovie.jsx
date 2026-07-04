import { useState, useEffect } from "react";
import { LockKeyhole, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModalState } from "@features/admin/movie-management/redux/slice";
import { useMovies } from "@hooks/useMovies";
import { MODAL_TYPES } from "@features/admin/movie-management/constants/modalTypes.js";
// import { useEditMovie } from "@hooks/useEditMovie"


const EMPTY_MOVIE = {
  maPhim: 0,
  tenPhim: "",
  biDanh: "",
  trailer: "",
  hinhAnh: "",
  moTa: "",
  maNhom: "",
  ngayKhoiChieu: "",
  danhGia: 0,
  hot: false,
  dangChieu: false,

  sapChieu: false,
};

export default function EditMovie() {
  const { id } = useParams();
  // const editMutation = useEditMovie();

  const { data: movies = [] } = useMovies();

  const dispatch = useDispatch();

  const editMovie =
    movies.find((movie) => movie.maPhim === Number(id)) ?? EMPTY_MOVIE;

  const [movie, setMovie] = useState(EMPTY_MOVIE);
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    setMovie({
      ...editMovie,
      ngayKhoiChieu: editMovie.ngayKhoiChieu.split("T")[0],
    });
    setImgPreview(editMovie.hinhAnh);
  }, [editMovie]);


  const onDiscardChange = () => dispatch(setModalState({ type: MODAL_TYPES.DISCARD_MOVIE_CHANGES }));


  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({
      ...prev,
      [name]: name === "danhGia" ? Number(value) : value,
    }));
  };


  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setMovie((prev) => ({ ...prev, [name]: checked }));
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setMovie((prev) => ({ ...prev, hinhAnh: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    return formData;

  };




  const onSaveChange = (e) => {
    const data = handleSubmit(e);

    const onConfirm = () => {
      editMutation.mutate(movie.maPhim);
      dispatch(setModalState({ type: null, data: null }));
    };
    dispatch(setModalState({ type: MODAL_TYPES.SAVE_MOVIE_CHANGES, data: onConfirm }));


  }
  return (
    <div className="mx-auto min-h-screen space-y-8 bg-[#0f172a] p-20 text-gray-100">
      <div className="flex items-center justify-between">
        <div className="mb-6 flex-1 space-y-2">
          <h1 className="text-3xl font-bold">Chỉnh Sửa Phim</h1>
          <p className="space-x-2 text-sm">
            <span>Mã phim:</span>{" "}
            <span className="text-yellow-500">#{movie.maPhim}</span>{" "}
            <span>| Nhóm: {movie.maNhom}</span>
          </p>
        </div>

        <div className="mt-6 flex space-x-3">
          <button
            type="submit"
            onClick={onSaveChange}
            className="w-2/3 cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-blue-500"
          >
            Lưu thay đổi
          </button>
          <button
            type="button"
            onClick={onDiscardChange}
            className="w-1/3 cursor-pointer rounded-lg border-none bg-rose-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-rose-500"
          >
            Hủy
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 text-slate-800 lg:grid-cols-3"
      >
        <div className="space-y-8 rounded-xl bg-gray-100 p-8 shadow-sm lg:col-span-2">
          <div className="flex flex-col gap-2.5">
            <label className="text-sm font-bold tracking-wider text-gray-700">
              Tên phim
            </label>
            <input
              type="text"
              name="tenPhim"
              value={movie.tenPhim}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-400 px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-bold tracking-wider text-gray-700">
                Bí danh (Slug)
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="biDanh"
                  value={movie.biDanh}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 text-gray-500"
                  disabled
                />
                <LockKeyhole className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-yellow-600" />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-bold tracking-wider text-gray-700">
                Ngày khởi chiếu
              </label>
              <input
                type="date"
                name="ngayKhoiChieu"
                value={movie.ngayKhoiChieu}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-400 px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-sm font-bold tracking-wider text-gray-700">
              Link Trailer (Youtube)
            </label>
            <input
              type="text"
              name="trailer"
              value={movie.trailer}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-400 px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-sm font-bold tracking-wider text-gray-700">
              Mô tả phim
            </label>
            <textarea
              name="moTa"
              rows="4"
              value={movie.moTa}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-400 px-4 py-2 text-gray-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-4">
            <label className="flex cursor-pointer items-center space-x-3">
              <input
                type="checkbox"
                name="dangChieu"
                checked={movie.dangChieu}
                onChange={handleCheckbox}
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
              />

              <span className="text-sm font-medium text-gray-700">
                Đang chiếu
              </span>
            </label>

            <label className="flex cursor-pointer items-center space-x-3">
              <input
                type="checkbox"
                name="sapChieu"
                checked={movie.sapChieu}
                onChange={handleCheckbox}
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Sắp chiếu
              </span>
            </label>

            <label className="flex cursor-pointer items-center space-x-3">
              <input
                type="checkbox"
                name="hot"
                checked={movie.hot}
                onChange={handleCheckbox}
                className="h-4 w-4 rounded text-red-600 focus:ring-red-500"
              />
              <span className="text-sm font-semibold text-red-600">
                Phim HOT 🔥
              </span>
            </label>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Đánh giá:
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="danhGia"
                  min="1"
                  max="10"
                  value={movie.danhGia}
                  onChange={handleChange}
                  className="w-8 rounded-sm border border-gray-400 px-1 py-px text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* CỘT BÊN PHẢI: POSTER & HÌNH ẢNH PREVIEW */}
        <div className="flex flex-col items-center justify-between rounded-xl bg-white p-6 shadow-sm">
          <div className="flex w-full flex-col items-center gap-5">
            <label className="mb-3 block text-center text-2xl font-medium tracking-wider text-gray-700">
              Hình ảnh poster
            </label>

            <div className="mx-auto mb-4 flex h-64 w-48 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
              {imgPreview ? (
                <img
                  src={imgPreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-400">Chưa có ảnh</span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-indigo-600"
            >
              Thay đổi hình ảnh
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddMovie() {
  const [imgPreview, setImgPreview] = useState('');

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      maNhom: 'GP01', // Mặc định theo data mẫu
      ngayKhoiChieu: '',
      danhGia: 10,
      hot: false,
      dangChieu: false,
      sapChieu: false,
      hinhAnh: null,
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string().required('Tên phim không được bỏ trống'),
      trailer: Yup.string().url('Sai định dạng url trailer').required('Trailer không được bỏ trống'),
      moTa: Yup.string().required('Mô tả không được bỏ trống'),
      ngayKhoiChieu: Yup.string().required('Vui lòng chọn ngày khởi chiếu'),
      danhGia: Yup.number().min(0).max(10).required('Đánh giá từ 0 đến 10'),
      hinhAnh: Yup.mixed().required('Vui lòng chọn hình ảnh'),
    }),
    onSubmit: (values) => {
      // Chuyển đổi dữ liệu sang FormData để chuẩn bị gửi lên API
      const formData = new FormData();
      for (let key in values) {
        if (key === 'hinhAnh') {
          formData.append('File', values.hinhAnh, values.hinhAnh.name);
        } else {
          formData.append(key, values[key]);
        }
      }
      
      console.log('FormData payload:', Object.fromEntries(formData));
      // Gọi API dispatch action ở đây...
    },
  });

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    if (file) {
      formik.setFieldValue('hinhAnh', file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgPreview(e.target.result);
      };
    }
  };

  return (
    <div className ="bg-slate-900 min-h-screen py-15">
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6">Thêm Phim Mới</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Tên phim & Trailer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-1">Tên phim</label>
            <input
              type="text"
              name="tenPhim"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tenPhim}
              className="w-full px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-neutral-500"
            />
            {formik.touched.tenPhim && formik.errors.tenPhim && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.tenPhim}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-1">Trailer (Link Youtube)</label>
            <input
              type="text"
              name="trailer"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.trailer}
              className="w-full px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-neutral-500"
            />
            {formik.touched.trailer && formik.errors.trailer && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.trailer}</p>
            )}
          </div>
        </div>

        {/* Ngày khởi chiếu & Đánh giá */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-1">Ngày khởi chiếu</label>
            <input
              type="date"
              name="ngayKhoiChieu"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ngayKhoiChieu}
              className="w-full px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-neutral-500"
            />
            {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.ngayKhoiChieu}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-1">Đánh giá (0 - 10)</label>
            <input
              type="number"
              name="danhGia"
              min="0"
              max="10"
              onChange={formik.handleChange}
              value={formik.values.danhGia}
              className="w-full px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1">Mô tả</label>
          <textarea
            name="moTa"
            rows="3"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.moTa}
            className="w-full px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-neutral-500"
          ></textarea>
          {formik.touched.moTa && formik.errors.moTa && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.moTa}</p>
          )}
        </div>

        {/* Các lựa chọn Trạng thái (Hot, Đang chiếu, Sắp chiếu) */}
        <div className="flex flex-wrap gap-6 py-2">
          <label className="inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              name="hot"
              onChange={formik.handleChange}
              checked={formik.values.hot}
              className="w-4 h-4 rounded border-neutral-300 text-neutral-800 focus:ring-0"
            />
            <span className="ml-2 text-sm text-neutral-700">Phim Hot</span>
          </label>

          <label className="inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              name="dangChieu"
              onChange={formik.handleChange}
              checked={formik.values.dangChieu}
              className="w-4 h-4 rounded border-neutral-300 text-neutral-800 focus:ring-0"
            />
            <span className="ml-2 text-sm text-neutral-700">Đang chiếu</span>
          </label>

          <label className="inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              name="sapChieu"
              onChange={formik.handleChange}
              checked={formik.values.sapChieu}
              className="w-4 h-4 rounded border-neutral-300 text-neutral-800 focus:ring-0"
            />
            <span className="ml-2 text-sm text-neutral-700">Sắp chiếu</span>
          </label>
        </div>

        {/* Hình ảnh */}
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1">Hình ảnh phim</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeFile}
            className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 cursor-pointer"
          />
          {formik.touched.hinhAnh && formik.errors.hinhAnh && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.hinhAnh}</p>
          )}
          
          {imgPreview && (
            <div className="mt-3">
              <img src={imgPreview} alt="Preview" className="w-32 h-44 object-cover rounded border border-neutral-200" />
            </div>
          )}
        </div>

        {/* Nút Submit */}
        <div className="pt-4 border-t border-neutral-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded transition-colors duration-200 cursor-pointer"
          >
            Thêm Phim
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
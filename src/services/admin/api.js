import { api } from "./client";





////////////////////////////////////////////////////////////////////////////////////////////

export const updateProfile = async (payload) => {
  const { data } = await api.put(
    "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    payload,
  );

  return data.content;
};




//////////////////////////////////////////////
export const getUserData = async (account) => {
  const { data } = await api.post(`/QuanLyNguoiDung/ThongTinTaiKhoan`, account);

  return data.content;
};



//////////////////////////////////////////////


export const getMovies = async () => {
  const response = await api.get("/QuanLyPhim/LayDanhSachPhim", {
    params: {
      maNhom: "GP01",
    },
  });

  return response.data.content;
};





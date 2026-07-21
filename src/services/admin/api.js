import { api } from "./client";

export const getUsers = async () => {
  const response = await api.get(
    "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
  );

  return response.data.content;
};

export const createUser = async (payload) => {
  const { data } = await api.post("QuanLyNguoiDung/ThemNguoiDung", payload);

  return data.content;
};

export const updateUser = async (payload) => {
  const { data } = await api.post(
    "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    payload,
  );

  return data.content;
};


////////////////////////////////////////////////////////////////////////////////////////////

export const updateProfile = async (payload) => {
  const { data } = await api.put(
    "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    payload,
  );

  return data.content;
};



export const getUserInfor = async (account) => {
  const { data } = await api.post(
    `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${account}`,
  );

  return data.content;
};

//////////////////////////////////////////////
export const getUserData = async (account) => {
  const { data } = await api.post(`/QuanLyNguoiDung/ThongTinTaiKhoan`, account);

  return data.content;
};

export const deleteUser = async (account) => {
  const { data } = await api.delete(
    `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`,
  );

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





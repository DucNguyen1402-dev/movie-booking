import customerClient from "./client";

export const bookingApi = {
  getTicketRoom: (maLichChieu) => {
    return customerClient.get("/QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        MaLichChieu: maLichChieu,
      },
    });
  },

  bookTickets: ({ maLichChieu, danhSachVe }) => {
    return customerClient.post("/QuanLyDatVe/DatVe", {
      maLichChieu,
      danhSachVe,
    });
  },
};
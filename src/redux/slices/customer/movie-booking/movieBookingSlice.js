import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seatRowList: [
    {
      row: "",
      seatList: [
        { seatNumber: "1", price: 0 },
        { seatNumber: "2", price: 0 },
        { seatNumber: "3", price: 0 },
        { seatNumber: "4", price: 0 },
        { seatNumber: "5", price: 0 },
        { seatNumber: "6", price: 0 },
        { seatNumber: "7", price: 0 },
        { seatNumber: "8", price: 0 },
        { seatNumber: "9", price: 0 },
        { seatNumber: "10", price: 0 },
        { seatNumber: "11", price: 0 },
        { seatNumber: "12", price: 0 },
      ],
    },
    {
      row: "A",
      seatList: [
        { seatNumber: "A1", price: 75000, isBooked: false },
        { seatNumber: "A2", price: 75000, isBooked: false },
        { seatNumber: "A3", price: 75000, isBooked: false },
        { seatNumber: "A4", price: 75000, isBooked: false },
        { seatNumber: "A5", price: 75000, isBooked: false },
        { seatNumber: "A6", price: 75000, isBooked: false },
        { seatNumber: "A7", price: 75000, isBooked: false },
        { seatNumber: "A8", price: 75000, isBooked: false },
        { seatNumber: "A9", price: 75000, isBooked: false },
        { seatNumber: "A10", price: 75000, isBooked: false },
        { seatNumber: "A11", price: 0, isBooked: true },
        { seatNumber: "A12", price: 0, isBooked: true },
      ],
    },
    {
      row: "B",
      seatList: [
        { seatNumber: "B1", price: 75000, isBooked: false },
        { seatNumber: "B2", price: 75000, isBooked: false },
        { seatNumber: "B3", price: 75000, isBooked: false },
        { seatNumber: "B4", price: 75000, isBooked: false },
        { seatNumber: "B5", price: 75000, isBooked: false },
        { seatNumber: "B6", price: 75000, isBooked: false },
        { seatNumber: "B7", price: 75000, isBooked: false },
        { seatNumber: "B8", price: 75000, isBooked: false },
        { seatNumber: "B9", price: 75000, isBooked: false },
        { seatNumber: "B10", price: 75000, isBooked: false },
        { seatNumber: "B11", price: 75000, isBooked: false },
        { seatNumber: "B12", price: 75000, isBooked: false },
      ],
    },
    {
      row: "C",
      seatList: [
        { seatNumber: "C1", price: 75000, isBooked: false },
        { seatNumber: "C2", price: 75000, isBooked: false },
        { seatNumber: "C3", price: 75000, isBooked: false },
        { seatNumber: "C4", price: 75000, isBooked: false },
        { seatNumber: "C5", price: 75000, isBooked: false },
        { seatNumber: "C6", price: 75000, isBooked: false },
        { seatNumber: "C7", price: 75000, isBooked: false },
        { seatNumber: "C8", price: 75000, isBooked: false },
        { seatNumber: "C9", price: 75000, isBooked: false },
        { seatNumber: "C10", price: 75000, isBooked: false },
        { seatNumber: "C11", price: 75000, isBooked: false },
        { seatNumber: "C12", price: 75000, isBooked: false },
      ],
    },
    {
      row: "D",
      seatList: [
        { seatNumber: "D1", price: 75000, isBooked: false },
        { seatNumber: "D2", price: 75000, isBooked: false },
        { seatNumber: "D3", price: 75000, isBooked: false },
        { seatNumber: "D4", price: 75000, isBooked: false },
        { seatNumber: "D5", price: 75000, isBooked: false },
        { seatNumber: "D6", price: 75000, isBooked: false },
        { seatNumber: "D7", price: 75000, isBooked: false },
        { seatNumber: "D8", price: 75000, isBooked: false },
        { seatNumber: "D9", price: 75000, isBooked: false },
        { seatNumber: "D10", price: 75000, isBooked: false },
        { seatNumber: "D11", price: 75000, isBooked: false },
        { seatNumber: "D12", price: 75000, isBooked: false },
      ],
    },
    {
      row: "E",
      seatList: [
        { seatNumber: "E1", price: 75000, isBooked: false },
        { seatNumber: "E2", price: 75000, isBooked: false },
        { seatNumber: "E3", price: 75000, isBooked: false },
        { seatNumber: "E4", price: 75000, isBooked: false },
        { seatNumber: "E5", price: 75000, isBooked: false },
        { seatNumber: "E6", price: 75000, isBooked: false },
        { seatNumber: "E7", price: 75000, isBooked: false },
        { seatNumber: "E8", price: 75000, isBooked: false },
        { seatNumber: "E9", price: 75000, isBooked: false },
        { seatNumber: "E10", price: 75000, isBooked: false },
        { seatNumber: "E11", price: 75000, isBooked: false },
        { seatNumber: "E12", price: 75000, isBooked: false },
      ],
    },
    {
      row: "F",
      seatList: [
        { seatNumber: "F1", price: 75000, isBooked: false },
        { seatNumber: "F2", price: 75000, isBooked: false },
        { seatNumber: "F3", price: 75000, isBooked: false },
        { seatNumber: "F4", price: 75000, isBooked: false },
        { seatNumber: "F5", price: 75000, isBooked: false },
        { seatNumber: "F6", price: 75000, isBooked: false },
        { seatNumber: "F7", price: 75000, isBooked: false },
        { seatNumber: "F8", price: 75000, isBooked: false },
        { seatNumber: "F9", price: 75000, isBooked: false },
        { seatNumber: "F10", price: 75000, isBooked: false },
        { seatNumber: "F11", price: 75000, isBooked: false },
        { seatNumber: "F12", price: 75000, isBooked: false },
      ],
    },
    {
      row: "G",
      seatList: [
        { seatNumber: "G1", price: 75000, isBooked: false },
        { seatNumber: "G2", price: 75000, isBooked: false },
        { seatNumber: "G3", price: 75000, isBooked: false },
        { seatNumber: "G4", price: 75000, isBooked: false },
        { seatNumber: "G5", price: 75000, isBooked: false },
        { seatNumber: "G6", price: 75000, isBooked: false },
        { seatNumber: "G7", price: 75000, isBooked: false },
        { seatNumber: "G8", price: 75000, isBooked: false },
        { seatNumber: "G9", price: 75000, isBooked: false },
        { seatNumber: "G10", price: 75000, isBooked: false },
        { seatNumber: "G11", price: 75000, isBooked: false },
        { seatNumber: "G12", price: 75000, isBooked: false },
      ],
    },
    {
      row: "H",
      seatList: [
        { seatNumber: "H1", price: 75000, isBooked: false },
        { seatNumber: "H2", price: 75000, isBooked: false },
        { seatNumber: "H3", price: 75000, isBooked: false },
        { seatNumber: "H4", price: 75000, isBooked: false },
        { seatNumber: "H5", price: 75000, isBooked: false },
        { seatNumber: "H6", price: 75000, isBooked: false },
        { seatNumber: "H7", price: 75000, isBooked: false },
        { seatNumber: "H8", price: 75000, isBooked: false },
        { seatNumber: "H9", price: 75000, isBooked: false },
        { seatNumber: "H10", price: 75000, isBooked: false },
        { seatNumber: "H11", price: 75000, isBooked: false },
        { seatNumber: "H12", price: 75000, isBooked: false },
      ],
    },
    {
      row: "I",
      seatList: [
        { seatNumber: "I1", price: 75000, isBooked: false },
        { seatNumber: "I2", price: 75000, isBooked: false },
        { seatNumber: "I3", price: 75000, isBooked: false },
        { seatNumber: "I4", price: 75000, isBooked: false },
        { seatNumber: "I5", price: 75000, isBooked: false },
        { seatNumber: "I6", price: 75000, isBooked: false },
        { seatNumber: "I7", price: 75000, isBooked: false },
        { seatNumber: "I8", price: 75000, isBooked: false },
        { seatNumber: "I9", price: 75000, isBooked: false },
        { seatNumber: "I10", price: 75000, isBooked: false },
        { seatNumber: "I11", price: 75000, isBooked: false },
        { seatNumber: "I12", price: 75000, isBooked: false },
      ],
    },
    {
      row: "J",
      seatList: [
        { seatNumber: "J1", price: 75000, isBooked: false },
        { seatNumber: "J2", price: 75000, isBooked: false },
        { seatNumber: "J3", price: 75000, isBooked: false },
        { seatNumber: "J4", price: 75000, isBooked: false },
        { seatNumber: "J5", price: 75000, isBooked: false },
        { seatNumber: "J6", price: 75000, isBooked: false },
        { seatNumber: "J7", price: 75000, isBooked: false },
        { seatNumber: "J8", price: 75000, isBooked: false },
        { seatNumber: "J9", price: 75000, isBooked: false },
        { seatNumber: "J10", price: 75000, isBooked: false },
        { seatNumber: "J11", price: 75000, isBooked: false },
        { seatNumber: "J12", price: 75000, isBooked: false },
      ],
    },
  ],
  selectedSeatList: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    selectSeat(state, action) {
      const targetSeat = action.payload;

      let selectedSeatList = state.selectedSeatList;

      const isSelected = selectedSeatList.some(
        (s) => s.seatNumber === targetSeat.seatNumber,
      );

      if (isSelected) {
        selectedSeatList = selectedSeatList.filter(
          (s) => s.seatNumber !== targetSeat.seatNumber,
        );
      } else {
        selectedSeatList.push(targetSeat);
      }
    },
    cancelSeatBooking(state, action) {
      const targetSeatNumber = action.payload;
      state.selectedSeatList = state.selectedSeatList.filter(
        (seat) => seat.seatNumber !== targetSeatNumber,
      );
    },
    confirmSeatBooking(state) {
      const selectedSeatNumbers = new Set(
        state.selectedSeatList.map((seat) => seat.seatNumber),
      );

      state.seatRowList.forEach((seatRow) =>
        seatRow.seatList.forEach((seat) => {
          if (selectedSeatNumbers.has(seat.seatNumber)) {
            seat.isBooked = true;
          }
        }),
      );
      state.selectedSeatList = [];
    },
  },
});

export const { selectSeat, cancelSeatBooking, confirmSeatBooking } =
  bookingSlice.actions;
export default bookingSlice.reducer;

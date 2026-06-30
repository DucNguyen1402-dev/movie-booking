export const selectSeatRowList = (state) => state.booking.seatRowList;
export const selectSeletedSeatList = (state) => state.booking.selectedSeatList;
export const selectTotalBookingPrice = (state) =>
  state.booking.selectedSeatList.reduce((total, seat) => total + seat.price, 0);

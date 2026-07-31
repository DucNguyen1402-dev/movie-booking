import { useDispatch, useSelector } from "react-redux";

import { selectSeat } from "@/redux/slices/customer/movie-booking/movieBookingSlice";

const SeatItem = ({ seat, rowLetter }) => {
  const dispatch = useDispatch();
  const selectedSeatList = useSelector(
    (state) => state.booking.selectedSeatList,
  );

  // 1. Safe guard for the top row header (empty row letter)
  if (!rowLetter || rowLetter.trim() === "") {
    return (
      <span className="rowNumber flex h-8 w-8 items-center justify-center rounded-sm font-bold text-yellow-500">
        {seat.seatNumber}
      </span>
    );
  }

  // 2. Determine class and state for actual interactive seats
  const isSelecting = selectedSeatList.some(
    (s) => s.seatNumber === seat.seatNumber,
  );

  const seatStateClass = seat.isBooked
    ? "bg-orange-500 text-white"
    : isSelecting
      ? "bg-green-500 text-white"
      : "bg-white text-slate-900 hover:bg-green-500 hover:text-white";

  const seatClass = `
  transition duration-200 cursor-pointer
  w-8 h-8 rounded-sm flex items-center justify-center
  border-2 border-black text-xs font-bold
  ${seatStateClass}
`;

  const seatLabel = seat.seatNumber.match(/\d+/)?.[0];

  return (
    <button
      className={seatClass}
      onClick={() => dispatch(selectSeat(seat))}
      title={`Seat: ${seat.seatNumber} - Price: ${(seat.price || 0).toLocaleString()} VND`}
    >
      {seatLabel}
    </button>
  );
};

export default SeatItem;

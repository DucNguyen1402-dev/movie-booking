import { useDispatch, useSelector } from "react-redux";

import {
  selectSeletedSeatList,
  selectTotalBookingPrice,
} from "@/redux/slices/customer/movie-booking/movieBookingSelectors";
import {
  cancelSeatBooking,
  confirmSeatBooking,
} from "@/redux/slices/customer/movie-booking/movieBookingSlice";

const TicketCheckout = () => {
  const dispatch = useDispatch();
  const selectedSeatList = useSelector(selectSeletedSeatList);

  const handleConfirm = () => {
    alert(`Successfully booked ${selectedSeatList.length} seats!`);
    dispatch(confirmSeatBooking()); // Trigger the state update flow
  };

  // Calculate total price using reduce accumulator pattern
  const totalBookingPrice = useSelector(selectTotalBookingPrice);

  return (
    <div className="w-100 rounded-lg border border-gray-700 bg-black/60 p-6 text-white backdrop-blur-sm">
      <h2 className="mb-4 border-b border-gray-700 pb-2 text-center text-xl font-bold tracking-wider uppercase">
        LIST OF SELECTED SEATS
      </h2>

      {/* Checkout Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-600 text-sm text-slate-400 md:text-base">
              <th className="px-1 py-2">Seat No.</th>
              <th className="px-1 py-2 text-right">Price (VND)</th>
              <th className="px-1 py-2 text-center">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {selectedSeatList.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="py-8 text-center text-sm text-gray-400 italic"
                >
                  No seats selected yet. Please pick your seats.
                </td>
              </tr>
            ) : (
              selectedSeatList.map((seat) => (
                <tr
                  key={seat.seatNumber}
                  className="border-b border-gray-800 text-sm hover:bg-white/5 md:text-base"
                >
                  <td className="px-1 py-3 font-semibold text-orange-400">
                    {seat.seatNumber}
                  </td>
                  <td className="px-1 py-3 text-right font-mono text-slate-200">
                    {seat.price.toLocaleString()}
                  </td>
                  <td className="px-1 py-3 text-center">
                    <button
                      className="scale-80 cursor-pointer rounded bg-red-500 px-3 py-1 font-bold text-white transition-colors duration-400 hover:bg-red-600"
                      onClick={() =>
                        dispatch(cancelSeatBooking(seat.seatNumber))
                      }
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {/* Total Row Footer */}
          {selectedSeatList.length > 0 && (
            <tfoot>
              <tr className="border-t border-gray-600 font-bold">
                <td className="px-1 py-4 text-sm text-white uppercase md:text-base">
                  Total Amount:
                </td>
                <td></td>
                <td className="px-1 py-4 text-right font-mono text-lg text-green-400">
                  {totalBookingPrice.toLocaleString()}
                </td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Prompt Checkout CTA (Optional expansion feature) */}
      {selectedSeatList.length > 0 && (
        <button
          className="mt-6 w-full cursor-pointer rounded bg-orange-500 px-4 py-2.5 font-bold text-white uppercase shadow-md transition-all duration-400 hover:bg-orange-600"
          onClick={handleConfirm}
        >
          Confirm Purchase
        </button>
      )}
    </div>
  );
};

export default TicketCheckout;

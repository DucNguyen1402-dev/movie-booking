import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cancelSeatBooking,
  confirmSeatBooking,
} from "@/redux/slices/movie-booking/movieBookingSlice";
import { selectSeletedSeatList, selectTotalBookingPrice } from "@/redux/slices/movie-booking/movieBookingSelectors";

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
    <div className="bg-black/60 p-6 w-100 rounded-lg border border-gray-700 backdrop-blur-sm text-white">
      <h2 className="text-xl font-bold uppercase tracking-wider  mb-4 border-b border-gray-700 pb-2 text-center">
        LIST OF SELECTED SEATS
      </h2>

      {/* Checkout Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-600 text-slate-400 text-sm md:text-base">
              <th className="py-2 px-1">Seat No.</th>
              <th className="py-2 px-1 text-right">Price (VND)</th>
              <th className="py-2 px-1 text-center">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {selectedSeatList.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-8 text-gray-400 text-sm italic"
                >
                  No seats selected yet. Please pick your seats.
                </td>
              </tr>
            ) : (
              selectedSeatList.map((seat) => (
                <tr
                  key={seat.seatNumber}
                  className="border-b border-gray-800 hover:bg-white/5 text-sm md:text-base"
                >
                  <td className="py-3 px-1 font-semibold text-orange-400">
                    {seat.seatNumber}
                  </td>
                  <td className="py-3 px-1 text-right font-mono text-slate-200">
                    {seat.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-1 text-center">
                    <button
                      className="text-white font-bold px-3 py-1 bg-red-500 hover:bg-red-600 rounded transition-colors duration-400 cursor-pointer scale-80"
                      onClick={() => dispatch(cancelSeatBooking(seat.seatNumber))}
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
              <tr className="font-bold border-t border-gray-600">
                <td className="py-4 px-1 uppercase text-sm md:text-base text-white">
                  Total Amount:
                </td>
                <td></td>
                <td className="py-4 px-1 text-right text-lg font-mono text-green-400">
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
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600  font-bold uppercase py-2.5 px-4 rounded shadow-md transition-all duration-400 cursor-pointer text-white"
          onClick={handleConfirm}
        >
          Confirm Purchase
        </button>
      )}
    </div>
  );
};

export default TicketCheckout;

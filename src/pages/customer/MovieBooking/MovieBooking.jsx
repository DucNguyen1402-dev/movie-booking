import { useSelector } from "react-redux";
import MovieScreen from "./components/MovieScreen";
import SeatRow from "./components/SeatRow";
import TicketCheckout from "./components/TicketCheckout";
import BookingInfo from "./components/BookingInfo";
import bgMovie from "@assets/bgmovie.jpg";
import { selectSeatRowList } from "@/redux/slices/movie-booking/movieBookingSelectors";

const MovieBooking = () => {
  const seatRowList = useSelector(selectSeatRowList);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-8 px-4 font-game"
      style={{
        backgroundImage: `url(${bgMovie})`,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-7xl mx-auto container ">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-orange-500 tracking-wider uppercase mb-8">
          CYBERLEARN.VN MOVIE TICKET BOOKING
        </h1>

        <div className="flex items-center justify-between ">
          {/* Left Column: Render rows directly here */}
          <div className="flex flex-col items-center pb-4 mt-4 gap-8 ">
            <MovieScreen />
            <div className="w-full flex flex-col items-center justify-center space-y-2 min-w-150">
              {seatRowList.map((seatRow, index) => (
                <SeatRow
                  key={seatRow.row || `row-num-${index}`}
                  seatRow={seatRow}
                />
              ))}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-2">
            <BookingInfo />
            <TicketCheckout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBooking;

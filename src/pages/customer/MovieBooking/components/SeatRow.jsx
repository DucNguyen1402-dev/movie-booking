import SeatItem from "./SeatItem";

const SeatRow = ({ seatRow }) => {
  return (
    <div className="flex w-full items-center justify-start gap-5 text-white md:w-auto">
      {/* Render row label character on the left side */}
      {seatRow.row !== "" ? (
        <span className="firstChar inline-block w-10 text-center font-bold text-yellow-500">
          {seatRow.row}
        </span>
      ) : (
        // Placeholder spacing matching the width of .firstChar for the top header row
        <span className="inline-block w-10"></span>
      )}

      {/* Render the list of seats in this specific row */}
      <div className="flex items-center gap-1">
        {seatRow.seatList.map((seat) => (
          <SeatItem key={seat.seatNumber} seat={seat} rowLetter={seatRow.row} />
        ))}
      </div>
    </div>
  );
};

export default SeatRow;

const BookingInfo = () => {
  return (
    <div className="bg-black/60 p-6 rounded-lg border border-gray-700 backdrop-blur-sm text-white">
      <h2 className="text-large font-bold uppercase tracking-widest text-yellow-400 mb-4 border-b border-gray-700 pb-2 text-center">
        SEAT STATUS LEGEND
      </h2>
      
      <div className="flex flex-col space-y-4">
        {/* Reserved Seat Indicator */}
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-none bg-orange-500 rounded-sm"></div>
          <span className="text-sm md:text-base text-gray-300 font-medium">
            Booked Seat
          </span>
        </div>

        {/* Selecting Seat Indicator */}
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-none bg-green-500 rounded-sm"></div>
          <span className="text-sm md:text-base text-gray-300 font-medium">
          Selected Seat
          </span>
        </div>

        {/* Available Seat Indicator */}
        <div className="flex items-center space-x-3">
          <div className="ghe w-5 h-5 border-2 border-black bg-white srounded-sm"></div>
          <span className="text-sm md:text-base text-gray-300 font-medium">
           Available Seat
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
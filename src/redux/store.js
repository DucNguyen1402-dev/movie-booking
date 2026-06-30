import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slices/movie-booking/movieBookingSlice.js";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});

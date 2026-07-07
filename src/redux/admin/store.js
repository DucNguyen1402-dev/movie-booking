import { configureStore } from "@reduxjs/toolkit";
import movieManagementReducer from "@features/admin/movie-management/redux/slice";

export const store = configureStore({
  reducer: {
    movieManagement: movieManagementReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import movieManagementReducer from "@features/admin/movies/list/contexts/redux/slice";

export const store = configureStore({
  reducer: {
    movieManagement: movieManagementReducer,
  },
});

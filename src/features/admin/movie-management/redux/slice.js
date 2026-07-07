import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  status: "",
  sortType: "",
};

const movieManagementSlice = createSlice({
  name: "movieManagement",
  initialState,
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    filterStatus(state, action){
      state.status = action.payload;
    },
    setSortType(state, action){
      state.sortType = action.payload;
    },

  },

});

export const { setKeyword , filterStatus,setSortType} = movieManagementSlice.actions;
export default movieManagementSlice.reducer;

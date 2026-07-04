import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  status: "",
  sortType: "",
  deleteId: null,
  modalState: { type:null, data: null},
  isTrailerOpen: false,
  traillerId: null
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

    setModalState(state, action){
       state.modalState = action.payload;
    },
    setTrailerState(state, action){
      state.isTrailerOpen = action.payload;
    },
    setTrailderId(state, action){
      state.traillerId = action.payload;
    }
  },

});

export const { setKeyword , filterStatus,setSortType, setModalState, setTrailerState, setTrailderId} = movieManagementSlice.actions;
export default movieManagementSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  status: "",
  sortType: "",
  deleteId: null,
  modalState: { type:null, data: null},
  isTrailerOpen: false,
  traillerId: null,
  confirmUpdate: false,
  updateState: {type: null, message: null},
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
    },
    setConfirmUpdate(state, action){
      state.confirmUpdate = action.payload;
    },
    setUpdateState(state, action){
      state.updateState = action.payload;
    }
  },

});

export const { setKeyword , filterStatus,setSortType, setModalState, setTrailerState, setTrailderId, setConfirmUpdate, setUpdateState} = movieManagementSlice.actions;
export default movieManagementSlice.reducer;

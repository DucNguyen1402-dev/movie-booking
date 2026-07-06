export const selectKeyword = (state) => state.movieManagement.keyword;

export const selectStatus = (state) => state.movieManagement.status;

export const selectSortType = (state) => state.movieManagement.sortType;

export const selectModalState = (state) => state.movieManagement.modalState;

export const selectDeleteId = (state) => state.movieManagement.deleteId;

export const selectTrailerState = (state) =>
  state.movieManagement.isTrailerOpen;

export const selectTrailerId = (state) => state.movieManagement.traillerId;

export const selectConfirmUpdate = (state) =>
  state.movieManagement.confirmUpdate;


import { useReducer,useRef } from "react";

const initialState = {
  isOpen: false,
  message: null,
  variant: null,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        isOpen: true,
        variant: action.payload.variant,
        message: action.payload.message,
      };

    case "HIDE_NOTIFICATION":
      return {
        ...state,
        isOpen: false,
        variant: null,
        message: null,
      };

    default:
      return state;
  }
};

export function useNotificationStates() {
  const [notification, dispatch] = useReducer(
    notificationReducer,
    initialState,
  );

  const notificationRef  = useRef(null);
  const timeoutRef = useRef(null);

  return {
    notification,
    dispatch,
    notificationRef,
    timeoutRef,
  };
}

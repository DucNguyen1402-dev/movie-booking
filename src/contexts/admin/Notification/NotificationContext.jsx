import { useRef, useEffect, useReducer, useContext, createContext } from "react";
import { notificationStyles } from "@config/admin/notification/styles";
import { notificationIcons } from "@config/admin/notification/icons";

const initialState = {
  isClose: false,
  message: null,
  type: null,
};
const notificationReducer = (state, action) => {

  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        isClose: true,
        type: action.payload?.type,
        message: action.payload?.message,
      };

    case "HIDE_NOTIFICATION":
      return {
        ...state,
        isClose: false,
        type: null,
        message: null,
      };
  }
};

const notificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notification, dispatch] = useReducer(
    notificationReducer,
    initialState,
  );

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const value = {
    message: notification.message,
    ref,
    styles: notificationStyles[notification.type] ?? "",
    Icon: notificationIcons[notification.type] ?? "span",
    isClose: notification.isClose,
    dispatch
  };

  return (
    <notificationContext.Provider value={value}>
      {children}
    </notificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(notificationContext);

  if (!context) {
    throw new Error("useEditMovie must be used within EditProvider");
  }

  return context;
}

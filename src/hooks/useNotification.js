import { useSelector } from "react-redux";
import { selectUpdateState } from "@features/admin/movie-management/redux/selectors";
import { useRef, useEffect, useState } from "react";
import { notificationStyles } from "@config/admin/notification/styles";
import { notificationIcons } from "@config/admin/notification/icons";

export function useNotification() {
  const { type, message } = useSelector(selectUpdateState);
  const ref = useRef(null);
 const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsClosed(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const shouldShow = type !== null;

  useEffect(() => {
    setIsClosed(shouldShow);
  }, [shouldShow]);

  return {
    message,
    ref,
    styles: notificationStyles[type] ?? "",
    Icon: notificationIcons[type] ?? "span",
    isClosed,
  };
}

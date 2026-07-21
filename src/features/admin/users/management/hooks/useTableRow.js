import { useUserDeletion } from "./useUserDeletion";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export function useTableRow({ isMatched }) {
  const { onDeletionClick, deletingAccount } = useUserDeletion();

  const rowRef = useRef(null);

  useEffect(() => {
    if (!isMatched) return;

    rowRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [isMatched]);

  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history ?? [];

  const onEditClick = (account) =>
    navigate(`/admin/users/edit/${account}`, {
      state: { history: [...history, location.pathname] },
    });

  const onBookingInforClick = (account) =>
    navigate(`/admin/users/booking-infor/${account}`, {
      state: { history: [...history, location.pathname] },
    });

  return {
    onDeletionClick,
    deletingAccount,
    rowRef,
    onEditClick,
    onBookingInforClick,
  };
}

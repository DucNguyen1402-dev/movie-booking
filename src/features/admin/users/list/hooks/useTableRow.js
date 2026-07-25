import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useScrollIntoView } from "@hooks/admin";

import { useUserDeletion } from "./useUserDeletion";

export function useTableRow({ isMatched }) {
  const { onDeletionClick, deletingAccount } = useUserDeletion();

  const rowRef = useRef(null);

  useScrollIntoView({ enabled: isMatched, ref: rowRef });

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

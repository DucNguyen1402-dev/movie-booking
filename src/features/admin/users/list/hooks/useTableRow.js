import { useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useScrollIntoView } from "@features/admin/hooks";

import { useUserDeletion } from "./useUserDeletion";

export function useTableRow({ isMatched }) {
  const { onDeletionClick, deletingAccount } = useUserDeletion();

  const rowRef = useRef(null);

  useScrollIntoView({ enabled: isMatched, ref: rowRef });

  const location = useLocation();
  const navigate = useNavigate();
  const history = useMemo(
    () => location.state?.history ?? [],
    [location.state?.history],
  );

  const onEditClick = useMemo(
    () => (account) =>
      navigate(`/admin/users/edit/${account}`, {
        state: { history: [...history, location.pathname] },
      }),
    [history, location.pathname, navigate],
  );

  const onBookingInforClick = useMemo(
    () => (account) =>
      navigate(`/admin/users/booking-infor/${account}`, {
        state: { history: [...history, location.pathname] },
      }),
    [history, location.pathname, navigate],
  );

  return {
    onDeletionClick,
    deletingAccount,
    rowRef,
    onEditClick,
    onBookingInforClick,
  };
}

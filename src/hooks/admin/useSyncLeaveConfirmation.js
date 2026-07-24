import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useSyncLeaveConfirmation(isDirty) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.shouldConfirmLeave === isDirty) return;
    navigate(".", {
      replace: true,
      state: {
        ...location.state,
        shouldConfirmLeave: isDirty,
      },
    });
  }, [isDirty, location.state, navigate]);
}

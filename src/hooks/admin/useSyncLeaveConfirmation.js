import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export function useSyncLeaveConfirmation(isDirty) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    navigate(".", {
      replace: true,
      state: {
        ...location.state,
        shouldConfirmLeave: isDirty,
      },
    });
  }, [isDirty]);
}

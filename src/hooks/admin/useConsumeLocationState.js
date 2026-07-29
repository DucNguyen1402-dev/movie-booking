import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export function useConsumeLocationState() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(
    (stateKeys) => {
      const state = location.state;

      if (!state) return;

      const consumeKeys = (
        Array.isArray(stateKeys) ? stateKeys : [stateKeys]
      ).filter((key) => key in state);

      if (consumeKeys.length === 0) return;
      const nextState = { ...state };

      consumeKeys.forEach((key) => {
        delete nextState[key];
      });

      navigate(".", {
        replace: true,
        state: Object.keys(nextState).length ? nextState : null,
      });
    },
    [location.state, navigate],
  );
}

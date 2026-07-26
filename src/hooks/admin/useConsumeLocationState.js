import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export function useConsumeLocationState() {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (stateKeys, delay = 2000) => {
      const state = location.state;

      if (!state) return;

      const consumeKeys = (
        Array.isArray(stateKeys) ? stateKeys : [stateKeys]
      ).filter((key) => key in state);

      if (consumeKeys.length === 0) return;

      const consume = () => {
        const nextState = { ...state };

        consumeKeys.forEach((key) => {
          delete nextState[key];
        });

        navigate(".", {
          replace: true,
          state: Object.keys(nextState).length ? nextState : null,
        });
      };

      if (delay === 0) {
        consume();
        return;
      }

      const timer = setTimeout(consume, delay);

      return () => clearTimeout(timer);
    },
    [location.state, navigate],
  );
}

import { useNavigate, useLocation } from "react-router-dom";

export function useUsersActions() {
  const location = useLocation();
  const navigate = useNavigate();

  const history = location.state?.history ?? [];

  const onAddUserClick = () =>
    navigate("/admin/users/add", {
      state: {
        history: [...history, location.pathname],
      },
    });

    return {
        onAddUserClick
    }
}

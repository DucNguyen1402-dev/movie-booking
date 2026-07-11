import { List } from "lucide-react";
import PlusButton from "@components/admin/PlusButton";
import { useUsersContext } from "../../contexts/UsersContext";

export default function UserHeader() {
  const { usersActions } = useUsersContext();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-slate-200">
        <List className="size-6" />
        <p>Danh sách người dùng trong hệ thống</p>
      </div>

      <PlusButton
        label={"Thêm người dùng"}
        type={"button"}
        onClick={() => usersActions.onAddUserClick()}
      />
    </div>
  );
}

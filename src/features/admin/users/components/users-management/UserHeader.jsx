import { List} from "lucide-react";
import {AddButton} from "@components/admin/buttons";
import { useUsersContext } from "../../contexts/UsersContext";

export default function UserHeader() {
  const { usersActions } = useUsersContext();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-slate-200">
        <List className="size-5" />
        <p>Danh sách người dùng trong hệ thống</p>
      </div>

      <AddButton
        size="md"
        onClick={() => usersActions.onAddUserClick()}
        surface ="dark"
      >
       
        Thêm Người dùng
      </AddButton>
    </div>
  );
}

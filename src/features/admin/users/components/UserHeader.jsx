import { List } from "lucide-react";
import PlusButton from "@components/admin/PlusButton";


export default function UserHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-slate-200">
        <List className="size-6" />
        <p>Danh sách người dùng trong hệ thống</p>
      </div>

      <PlusButton label={"Thêm người dùng"} type={"button"} />
    </div>
  );
}

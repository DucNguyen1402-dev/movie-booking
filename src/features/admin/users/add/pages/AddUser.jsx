import { PencilLine } from "lucide-react";

import {AddUserForms} from "@features/admin/users/add/components";

export default function AddUser() {
  return (
    <div className="min-h-screen w-full space-y-8 bg-linear-to-br from-slate-900 via-slate-800 to-slate-700 pt-8">
      <div className="flex items-center justify-center gap-3 text-slate-200">
        <PencilLine className="size-4" />
        <p className="mt-2 text-center">
          Hoàn thiện form dưới đây để thêm người dùng mới
        </p>
      </div>

      <AddUserForms />
    </div>
  );
}

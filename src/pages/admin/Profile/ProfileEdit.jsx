import { ProfileForm } from "@features/admin/Profile/components/ProfileEdit";
import { PencilLine } from "lucide-react";

export default function ProfileEdit() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 p-4 pb-20 antialiased">
      <div className="flex flex-col items-center justify-center gap-8 pt-2">
        <div className ="flex items-center justify-center gap-2">
          <PencilLine className ="size-4"/>
          <h2 className="text-sm text-slate-300">
           Cập nhật thông tin tài khoản của bạn bằng biểu mẫu bên dưới.
          </h2>
        </div>
        <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}

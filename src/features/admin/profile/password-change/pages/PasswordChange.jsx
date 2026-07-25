import {
  PasswordChangeForm,
  PasswordChangeHeader,
} from "@features/admin/profile/password-change/components";

const PasswordChange = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="mt-10 flex items-center justify-center">
        <div className="w-full max-w-md space-y-10 rounded-2xl border border-slate-700/50 bg-slate-800 p-8 shadow-2xl">
          <PasswordChangeHeader />
          <PasswordChangeForm />
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;

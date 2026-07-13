export default function UserProfileHeader({initial, taiKhoan, roleLabel}) {
  return (
    <div className="mb-10 flex flex-col items-center space-y-3">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-600 text-3xl font-bold">
        {initial}
      </div>

      <h2 className="text-2xl font-semibold text-slate-100">
        {taiKhoan}
      </h2>

      <p className="text-sm text-slate-200">
        {roleLabel}
      </p>
    </div>
  );
}

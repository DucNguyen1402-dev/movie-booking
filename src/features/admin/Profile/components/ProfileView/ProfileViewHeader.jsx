export default function ProfileViewHeader({avatarLetter, name}) {
  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border border-slate-500/20 bg-slate-950/10 text-4xl font-semibold tracking-wider text-slate-100 select-none">
        {avatarLetter}
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-xl font-medium text-slate-100">{name}</h2>
        <span className="rounded-md bg-[#2D2D2D] px-4 py-1 font-mono text-xs tracking-wider text-yellow-400">
          QUẢN TRỊ VIÊN
        </span>
      </div>
    </div>
  );
}

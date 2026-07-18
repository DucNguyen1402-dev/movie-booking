import avatar01 from "@images/admin/avatar-01.png";
export default function AvatarSetting() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex w-150 flex-wrap items-center justify-center gap-5 p-10 z-9999 bg-slate-300 rounded-md">
        <div className="overflow-hidden h-24 w-24 rounded-full border border-slate-500">
          <img src={avatar01} className="object-fit h-full w-full" />
        </div>
        <div className="overflow-hidden h-24 w-24 rounded-full border border-slate-500">
          <img src={avatar01} className="object-fit h-full w-full border border-slate-500" />
        </div>
        <div className="overflow-hidden h-24 w-24 rounded-full border border-slate-500">
          <img src={avatar01} className="object-fit h-full w-full" />
        </div>
        <div className="overflow-hidden h-24 w-24 rounded-full border border-slate-500">
          <img src={avatar01} className="object-fit h-full w-full" />
        </div>
        <div className="overflow-hidden h-24 w-24 rounded-full border border-slate-500">
          <img src={avatar01} className="object-fit h-full w-full" />
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Pen } from "lucide-react";
import AvatarSetting from "./AvatarSetting";


export default function ProfileViewHeader({ avatarLetter, name }) {
  const [avatarList, setAvatarList] = useState(false);

  const onAvatarClick = () => setAvatarList(true);

  return (
    <>
      <div className="mb-8 flex flex-col items-center">
        <div className="group relative">
          <button
            className="mb-3 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-slate-500/20 bg-slate-950/10 text-4xl font-semibold tracking-wider text-slate-100 transition-colors duration-300 select-none hover:bg-slate-950/20"
            onClick={onAvatarClick}
          >
            {avatarLetter}
            <div className="absolute right-3 bottom-5.5 text-white opacity-0 transition-opacity duration-100 group-hover:opacity-100">
              <Pen className="size-4.5" />
            </div>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-xl font-medium text-slate-100">{name}</h2>
          <span className="rounded-md bg-[#2D2D2D] px-4 py-1 font-mono text-xs tracking-wider text-yellow-400">
            QUẢN TRỊ VIÊN
          </span>
        </div>
      </div>
      {avatarList && (
        <>
         <div className="fixed inset-0 bg-black backdrop-blur-[2px] transition-opacity duration-200"></div>
         <AvatarSetting />
        </>
      )}
    </>
  );
}

import { useState } from "react";

import { Pen } from "lucide-react";

import { useUserContext } from "@contexts/admin/user";
import {useLockBodyScroll} from "@hooks/admin"

import AvatarSetting from "./AvatarSetting";

export default function ProfileViewHeader({ name }) {
  const [isAvatarSettingOpen, setIsAvatarSettingOpen] = useState(false);

  const { storageAvatar, avatarName } = useUserContext();

  useLockBodyScroll(isAvatarSettingOpen);

  const onAvatarClick = () => setIsAvatarSettingOpen(true);
  const closeAvatarSetting = () => {
    setIsAvatarSettingOpen(false);
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-center">
        <div className="group relative">
          <button
            className="mb-3 flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-slate-500/20 bg-yellow-600 text-4xl font-semibold tracking-wider text-slate-100 transition-colors duration-300 select-none hover:bg-yellow-600/80"
            onClick={onAvatarClick}
          >
            {storageAvatar ? (
              <img src={storageAvatar} className="object-fit h-full w-full" />
            ) : (
              avatarName
            )}
            <div className="absolute right-3 bottom-5.5 opacity-0 transition-opacity duration-100 group-hover:opacity-100">
              <Pen className="size-4.5 text-slate-100 " />
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
      {isAvatarSettingOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black backdrop-blur-[2px] transition-opacity duration-200"></div>
          <AvatarSetting onClose={closeAvatarSetting} />
        </>
      )}
    </>
  );
}

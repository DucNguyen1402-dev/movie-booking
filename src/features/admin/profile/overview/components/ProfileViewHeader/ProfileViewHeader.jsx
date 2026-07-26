import { useState } from "react";

import { Pen } from "lucide-react";

import { useUserContext } from "@contexts/admin";
import { useLockBodyScroll } from "@hooks/admin";
import { Button } from "@components/admin/ui";

import AvatarSetting from "./AvatarSetting";

const ProfileViewHeader = ({ name }) => {
  const [isAvatarSettingOpen, setIsAvatarSettingOpen] = useState(false);

  const { storageAvatar, avatarName } = useUserContext();

  useLockBodyScroll(isAvatarSettingOpen);

  const onAvatarClick = () => setIsAvatarSettingOpen(true);
  const closeAvatarSetting = () => setIsAvatarSettingOpen(false);

  return (
    <>
      <div className="mb-8 flex flex-col items-center">
        <Button
          className="group relative z-10 size-20 overflow-hidden rounded-full border border-slate-500/20 bg-yellow-600 text-4xl font-semibold tracking-wider text-slate-100"
          size="none"
          onClick={onAvatarClick}
        >
          {storageAvatar ? (
            <img src={storageAvatar} className="object-fit h-full w-full" />
          ) : (
            avatarName
          )}
          <div className="absolute right-3.5 bottom-3 opacity-0 transition-opacity duration-100 group-hover:opacity-100">
            <Pen className="size-4.5 text-slate-100" />
          </div>
          <div className="absolute inset-0 z-20 bg-slate-950/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Button>

        <div className="mt-3 flex flex-col items-center justify-center gap-3">
          <h2 className="text-xl font-medium text-slate-100">{name}</h2>
          <span className="rounded-md border border-violet-500/40 bg-violet-950/30 px-4 py-1 font-mono text-xs tracking-wider text-violet-300">
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
};

export default ProfileViewHeader;

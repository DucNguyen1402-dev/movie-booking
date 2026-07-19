import { X } from "lucide-react";
import { useUserContext } from "@contexts/admin";

export default function AvatarSetting({ onClose }) {
  const { setAvatarIndex, avatarName, avatarList } = useUserContext();

  const onAvatarSeletion = (index) => {
    setAvatarIndex(index);
    onClose();
  };


  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div className="relative flex w-150 flex-wrap items-center justify-center gap-5 rounded-md bg-slate-700/80 p-10">
        <button
          onClick={() => onAvatarSeletion(null)}
          className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-slate-500 bg-yellow-600 text-4xl text-slate-100 transition-transform duration-300 hover:scale-105"
        >
          {avatarName}
        </button>
        {avatarList.map((avatar, index) => (
          <button
            key={index}
            onClick={() => onAvatarSeletion(index)}

            className="h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-slate-500 transition-transform duration-300 hover:scale-105"
          >
            <img src={avatar} className="object-fit h-full w-full" />
          </button>
        ))}

        <button
          className="absolute top-1.5 right-1.5 cursor-pointer font-bold text-slate-300 transition-colors duration-200 hover:text-slate-200"
          onClick={onClose}
        >
          <X className="size-6" />
        </button>
      </div>
    </div>
  );
}

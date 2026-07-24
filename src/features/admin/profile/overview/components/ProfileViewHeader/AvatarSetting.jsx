import { useMemo } from "react";

import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { useUserContext } from "@contexts/admin/user";
import { usePagination } from "@hooks/admin";

export default function AvatarSetting({ onClose }) {
  const { setAvatarIndex, avatarName, avatarList } = useUserContext();

  const pagination = usePagination({
    items: avatarList,
    size: 7,
    resetDeps: [avatarList],
  });

  const handleAvatarSelection = useMemo(
    () => (pageIndex) => {
      const avatarIndex = pagination.pageOffset + pageIndex;

      setAvatarIndex(avatarIndex);
      onClose();
    },
    [onClose, pagination.pageOffset, setAvatarIndex],
  );

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div className="relative flex h-80 w-150 flex-wrap items-center justify-center gap-5 overflow-x-auto rounded-md bg-slate-700/80 p-10">
        {pagination.page !== 1 && (
          <button
            onClick={() => handleAvatarSelection(-1)}
            className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-slate-500 bg-yellow-600 text-4xl text-slate-100 transition-transform duration-300 hover:scale-105"
          >
            {avatarName}
          </button>
        )}
        {pagination.list.map((avatar, index) => (
          <button
            key={index}
            onClick={() => handleAvatarSelection(index)}

            className="h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-slate-500 transition-transform duration-300 hover:scale-105"
          >
            <img src={avatar} className="object-fit h-full w-full" />
          </button>
        ))}

        {!pagination.controls.isPrevDisabled && (
          <button
            disabled={pagination.controls.isPrevDisabled}
            onClick={pagination.controls.onPrevClick}
            className="absolute top-1/2 left-1 -translate-y-1/2 cursor-pointer text-slate-300 transition-colors duration-300 hover:text-slate-100"
          >
            <ChevronLeft className="size-12" />
          </button>
        )}

        {!pagination.controls.isNextDisabled && (
          <button
            disabled={pagination.controls.isNextDisabled}
            onClick={pagination.controls.onNextClick}
            className="absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer text-slate-300 transition-colors duration-300 hover:text-slate-100"
          >
            <ChevronRight className="size-12" />
          </button>
        )}

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

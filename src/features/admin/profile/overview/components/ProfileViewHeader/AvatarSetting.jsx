import { useCallback } from "react";

import { usePagination } from "@shared/table";
import { Button } from "@shared/ui";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";

import { auth } from "@features/admin/auth";

const AvatarSetting = ({ onClose }) => {
  const { setAvatarIndex, avatarName, avatarList, currentAvatarIndex } =
    auth.use();

  const pagination = usePagination({
    items: avatarList,
    pageSize: 7,
    resetDeps: [avatarList],
  });

  const handleAvatarSelection = useCallback(
    (pageIndex) => {
      const avatarIndex = pagination.state.pageOffset + pageIndex;

      setAvatarIndex(avatarIndex);
      onClose();
    },
    [onClose, pagination.state.pageOffset, setAvatarIndex],
  );

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div className="relative flex h-80 w-150 flex-wrap items-center justify-center gap-5 overflow-x-auto rounded-md bg-slate-700/80 p-10">
        {pagination.state.page !== 1 && (
          <Button
            onClick={() => handleAvatarSelection(-1)}
            size="none"
            className="h-24 w-24 rounded-full border border-slate-500 bg-yellow-600 text-5xl text-slate-100 transition-transform hover:scale-105"
          >
            {avatarName}
          </Button>
        )}
        {pagination.state.list.map((avatar, index) => (
          <Button
            key={index}
            size="none"
            onClick={() => handleAvatarSelection(index)}
            className="relative h-24 w-24 overflow-hidden rounded-full border border-slate-500 transition-transform hover:scale-105"
          >
            <img src={avatar} className="object-fit h-full w-full" />
            {index + pagination.state.pageOffset === currentAvatarIndex && (
              <div className="absolute right-4 bottom-1.5 rounded-full border-2 border-slate-100">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600">
                  <Check className="size-4 font-bold text-white" />
                </div>
              </div>
            )}
          </Button>
        ))}

        {!pagination.state.isPrevDisabled && (
          <Button
            disabled={pagination.state.isPrevDisabled}
            onClick={pagination.actions.onPrevClick}
            size="none"
            className="absolute top-1/2 left-1 -translate-y-1/2 text-slate-300 hover:text-slate-100"
          >
            <ChevronLeft className="size-12" />
          </Button>
        )}

        {!pagination.state.isNextDisabled && (
          <Button
            disabled={pagination.state.isNextDisabled}
            onClick={pagination.actions.onNextClick}
            size="none"
            className="absolute top-1/2 right-1 -translate-y-1/2 text-slate-300 hover:text-slate-100"
          >
            <ChevronRight className="size-12" />
          </Button>
        )}

        <Button
          className="absolute top-1.5 right-1.5 font-bold text-slate-300 hover:text-slate-200"
          onClick={onClose}
          size="none"
        >
          <X className="size-6" />
        </Button>
      </div>
    </div>
  );
};

export default AvatarSetting;

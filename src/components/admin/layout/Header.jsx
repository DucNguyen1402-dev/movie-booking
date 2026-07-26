import { matchPath, useLocation, useNavigate } from "react-router-dom";

import { PAGE_CONFIG } from "@config/admin";
import { MoveLeft } from "lucide-react";

import { useLayoutContext, useModalContext } from "@contexts/admin";
import { MODAL_TYPES } from "@constants/admin";

const Header = () => {
  const { isSidebarOpen } = useLayoutContext();
  const location = useLocation();
  const navigate = useNavigate();

  const history = location.state?.history ?? [];
  const shouldConfirmLeave = location.state?.shouldConfirmLeave ?? false;
  const previous = history.at(-1) ?? null;

  const modal = useModalContext();

  const isDisabledBack = previous === null;

  const page = PAGE_CONFIG.find((item) =>
    matchPath(item.path, location.pathname),
  );

  const onBackClick = () => {
    if (!previous) return;

    const goBack = () => {
      navigate(previous, {
        state: {
          history: history.slice(0, -1),
        },
      });
    };

    if (!shouldConfirmLeave) {
      goBack();
      return;
    }

    modal.open({
      type: MODAL_TYPES.LEAVE_PAGE,
      onConfirm: () => {
        modal.close();
        goBack();
      },
    });
  };

  isSidebarOpen;

  return (
    <header
      className={`sticky top-0 z-30 flex h-28 items-center border-b border-gray-800 bg-[#1e1e1e]/80 backdrop-blur-md transition-[padding] duration-300 ease-in-out will-change-transform ${isSidebarOpen ? "pl-8" : "lg:pl-20 2xl:pl-10 "}`}
    >
      <div className="space-y-3 py-4">
        <h1 className="text-2xl font-semibold text-white">{page?.title}</h1>
        {page?.description && (
          <p className="mt-1 text-sm text-gray-400">{page?.description}</p>
        )}
        {!isDisabledBack && (
          <button
            onClick={onBackClick}
            disabled={isDisabledBack}
            className="mt-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-700 hover:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none active:scale-95"
            aria-label="Go back"
          >
            <MoveLeft className="size-3" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

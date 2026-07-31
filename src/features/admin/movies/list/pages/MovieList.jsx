import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useLockBodyScroll } from "@shared/hooks";
import { layout } from "@shared/layouts";
import { toast } from "@shared/overlays";
import { Backdrop } from "@shared/overlays";
import { PaginationSelect } from "@shared/table";
import { AnimatePresence, motion } from "motion/react";

import {
  useConsumeLocationState,
  useTemporaryState,
} from "@features/admin/hooks";
import {
  AddMovieBtn,
  MoviesTable,
  MovieStatusFilter,
  SearchBar,
  SortSelect,
  TrailerModal,
} from "@features/admin/movies/list/components";
import { useMovieListContext } from "@features/admin/movies/list/contexts";

const MovieList = () => {
  const location = useLocation();

  const { isSidebarOpen } = layout.use();
  const {
    trailer: { trailer },
    pagination,
  } = useMovieListContext();
  const { show: showToast } = toast.use();

  const [toastState] = useTemporaryState(location.state?.toastState);

  useConsumeLocationState("toastState");
  useEffect(() => {
    if (!toastState) return;
    showToast(toastState);
  }, [toastState, showToast]);

  useLockBodyScroll(trailer.url !== null);

  return (
    <>
      <div className="min-h-screen bg-[#0f172a] px-6 pt-10 pb-8 font-sans text-slate-100">
        <div
          className={`mx-auto w-full space-y-8 transition-[max-width] duration-300 ease-in-out ${isSidebarOpen ? "max-w-full 2xl:max-w-360" : "max-w-7xl 2xl:max-w-340"}`}
        >
          <div className="flex items-center justify-end">
            <div className="flex flex-col gap-4">
              <AddMovieBtn />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 rounded-2xl border border-slate-800/80 bg-[#1e293b]/50 p-4 backdrop-blur-sm">
            <div className="col-span-3">
              <SearchBar />
            </div>
            <MovieStatusFilter />
            <SortSelect />
            <PaginationSelect
              value={pagination.state.currentSize}
              onChange={(e) => pagination.actions.setSize(e.target.value)}
            />
          </div>

          <MoviesTable />
        </div>
      </div>

      <AnimatePresence>
        {trailer.url !== null && (
          <>
            <Backdrop surface="dark">
              <motion.div
                className="fixed inset-0 z-80 flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.1, delay: 0.2, ease: "easeOut" }}
              >
                <TrailerModal />
              </motion.div>
            </Backdrop>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MovieList;

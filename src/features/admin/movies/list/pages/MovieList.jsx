import { useEffect } from "react";

import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import { useNotificationContext, useLayoutContext } from "@contexts/admin";
import { useMovieListContext } from "@features/admin/movies/list/contexts";

import { useConsumeLocationState, useLockBodyScroll } from "@hooks/admin";

import { PAGE_SIZE_OPTIONS } from "@config/admin";

import { Select, Backdrop } from "@components/admin";

import {
  AddMovieBtn,
  SearchBar,
  MovieStatusFilter,
  SortSelect,
  MoviesTable,
  TrailerModal,
} from "@features/admin/movies/list/components";

export default function MovieList() {
  const location = useLocation();

  const { isSidebarOpen } = useLayoutContext();
  const { notificationActions } = useNotificationContext();

  const {
    trailer: { trailer },
    pagination: { currentSize, setSize },
  } = useMovieListContext();

  useEffect(() => {
    if (location.state?.notification) {
      notificationActions.show(location.state.notification);
    }
  }, [location.state?.notification]);

  useLockBodyScroll(trailer.url !== null);
  useConsumeLocationState("notification", 10000);

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

          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-800/80 bg-[#1e293b]/50 p-4 backdrop-blur-sm sm:grid-cols-6">
            <div className="col-span-3">
              <SearchBar />
            </div>
            <MovieStatusFilter />
            <SortSelect />
            <Select
              value={currentSize}
              onChange={(e) => setSize(e.target.value)}
              options={PAGE_SIZE_OPTIONS}
            />
          </div>

          <MoviesTable />
        </div>
      </div>

      <AnimatePresence>
        {trailer.url !== null && (
          <>
            <Backdrop surface="deepdark" />
            <motion.div
              className="fixed inset-0 z-80 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.1, delay: 0.2, ease: "easeOut" }}
            >
              <TrailerModal />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect } from "react";
import AddMovieBtn from "@features/admin/movies-management/list/components/AddMovieBtn";
import SearchBar from "@features/admin/movies-management/list/components/SearchBar";
import MovieStatusFilter from "@features/admin/movies-management/list/components/MovieStatusFilter";
import SortSelect from "@features/admin/movies-management/list/components/SortSelect";
import MoviesTable from "@features/admin/movies-management/list/components/MoviesTable/MoviesTable";
import Backdrop from "@/components/admin/Backdrop";
import { AnimatePresence, motion } from "motion/react";
import { useTrailerContext } from "@features/admin/movies-management/list/contexts/TrailerContext";
import TrailerModal from "@features/admin/movies-management/list/components/TrailerModal";
import { useLockBodyScroll } from "@hooks/admin/useLockBodyScroll";
import {  useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "@contexts/admin/NotificationContext";

export default function MovieManagement() {
  const location = useLocation();
  const navigate = useNavigate();
  const { notifActions } = useNotification();

  useEffect(() => {
    if (location.state?.notification) {
      notifActions.showNotification(location.state.notification);
    }
  }, [location.state]);

  const { trailer } = useTrailerContext();

  useLockBodyScroll(trailer.url !== null);

  const onAddMovieClick = () =>
    navigate("/admin/movies/add", {
      state: {
        history: [...(location.state?.history ?? []), location.pathname],
      },
    });

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 font-sans text-slate-100">
      {/* 1. HEADER & ACTION BAR */}
      <div className="flex items-center justify-end">
        <div className="mb-8 flex flex-col gap-4" onClick={onAddMovieClick}>
          <AddMovieBtn />
        </div>
      </div>

      {/* 2. FILTER & SEARCH BAR */}
      <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-slate-800/80 bg-[#1e293b]/50 p-4 backdrop-blur-sm sm:grid-cols-3">
        <SearchBar />
        <MovieStatusFilter />
        <SortSelect />
      </div>

      {/* 3. DATA TABLE */}
      <MoviesTable />

      <AnimatePresence>
        {trailer.url !== null && (
          <motion.div
            className="fixed inset-0 z-80 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Backdrop />
            <TrailerModal />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

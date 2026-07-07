import {useEffect} from "react";
import AddMovieBtn from "@features/admin/movie-management/components/addMovieBtn";
import SearchBar from "@features/admin/movie-management/components/SearchBar";
import MovieStatusFilter from "@features/admin/movie-management/components/MovieStatusFilter";
import SortSelect from "@features/admin/movie-management/components/SortSelect";
import MoviesTable from "@features/admin/movie-management/components/MoviesTable/MoviesTable";
import Backdrop from "@/components/admin/Backdrop";
import { AnimatePresence, motion } from "motion/react";
import { selectTrailerState } from "@features/admin/movie-management/redux/selectors";
import { useSelector } from "react-redux";
import TrailerModal from "@features/admin/movie-management/components/TrailerModal";
import { useLockBodyScroll } from "@hooks/useLockBodyScroll";
import { Link, useLocation } from "react-router-dom";
import { useNotification } from "@contexts/admin/NotificationContext";

export default function MovieManagement() {
  const location = useLocation();

  const { notifActions } = useNotification();

  useEffect(() => {
    if (location.state?.notification) {
      notifActions.showNotification(location.state.notification);
    }
  }, [location.state]);

  const isTrailerOpen = useSelector(selectTrailerState);

  const isLock = isTrailerOpen;
  useLockBodyScroll(isLock);

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 font-sans text-slate-100">
      {/* 1. HEADER & ACTION BAR */}
      <Link
        className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-end"
        to="/admin/movies/add"
      >
        <AddMovieBtn />
      </Link>

      {/* 2. FILTER & SEARCH BAR */}
      <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-slate-800/80 bg-[#1e293b]/50 p-4 backdrop-blur-sm sm:grid-cols-3">
        <SearchBar />
        <MovieStatusFilter />
        <SortSelect />
      </div>

      {/* 3. DATA TABLE */}
      <MoviesTable />

      <AnimatePresence>
        {isTrailerOpen && (
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

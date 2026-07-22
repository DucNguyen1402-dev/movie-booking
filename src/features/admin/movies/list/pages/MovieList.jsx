import { useEffect } from "react";
import {PAGE_SIZE_OPTIONS} from "@config/admin/pagination";
import AddMovieBtn from "@features/admin/movies/list/components/AddMovieBtn";
import SearchBar from "@features/admin/movies/list/components/SearchBar";
import MovieStatusFilter from "@features/admin/movies/list/components/MovieStatusFilter";
import SortSelect from "@features/admin/movies/list/components/SortSelect";
import MoviesTable from "@features/admin/movies/list/components/MoviesTable/MoviesTable";
import { Select } from "@components/admin";
import Backdrop from "@/components/admin/Backdrop";
import { AnimatePresence, motion } from "motion/react";
import { useMovieListContext } from "@features/admin/movies/list/contexts";
import TrailerModal from "@features/admin/movies/list/components/TrailerModal";
import { useLockBodyScroll } from "@hooks/admin/useLockBodyScroll";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotificationContext } from "@contexts/admin/notification";
import { useLayoutContext } from "@contexts/admin/layout";



export default function MovieList() {
  const { isSidebarOpen } = useLayoutContext();
  
  const location = useLocation();
  const navigate = useNavigate();
  const {  notificationActions } = useNotificationContext();

  useEffect(() => {
    if (location.state?.notification) {
      notificationActions.show(location.state.notification);
    }
  }, [location.state]);

  const {
    trailer: { trailer },
    pagination: { currentSize, setSize },
  } = useMovieListContext();

  useLockBodyScroll(trailer.url !== null);

  const onAddMovieClick = () =>
    navigate("/admin/movies/add", {
      state: {
        history: [...(location.state?.history ?? []), location.pathname],
      },
    });

    

  return (
    <>
      <div className="min-h-screen bg-[#0f172a] px-6 pt-10 pb-8 font-sans text-slate-100">
        <div className={`  mx-auto w-full space-y-8 transition-[max-width] duration-300 ease-in-out ${isSidebarOpen ? "max-w-full 2xl:max-w-360": "max-w-7xl 2xl:max-w-340"}`}>
          {/* 1. HEADER & ACTION BAR */}
          <div className="flex items-center justify-end">
            <div className="flex flex-col gap-4">
              <AddMovieBtn onAddMovieClick={onAddMovieClick} />
            </div>
          </div>

          {/* 2. FILTER & SEARCH BAR */}
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-800/80 bg-[#1e293b]/50 p-4 backdrop-blur-sm sm:grid-cols-6">
            <div className="col-span-3">
              <SearchBar />
            </div>
            <MovieStatusFilter />
            <SortSelect />
            <Select
              value={currentSize}
              onChange={(e) => setSize(e.target.value)}
              options = {PAGE_SIZE_OPTIONS}
            />
          </div>

          {/* 3. DATA TABLE */}
          <MoviesTable />
        </div>
      </div>

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
    </>
  );
}

import { useUsersContext } from "../../contexts/UsersContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UserPagination({}) {
  const {
    userFilters: { filteredUsers },
    userPagination: { setPage, pagination },
  } = useUsersContext();

  const totalPages = Math.ceil(filteredUsers.length / pagination.size);
  const totalUsers = filteredUsers.length;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const displayStart =
    totalUsers === 0 ? 0 : (pagination.page - 1) * pagination.size + 1;

  const displayEnd = Math.min(pagination.page * pagination.size, totalUsers);

  const currentPage = pagination.page;

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage >= totalPages;
  return (
    <div className="flex items-center justify-between text-sm text-slate-400">
      <p className="text-sm text-slate-400">
        Hiển thị{" "}
        <span className="font-medium text-slate-200">
          {displayStart}-{displayEnd}
        </span>{" "}
        trên <span className="font-medium text-slate-200">{filteredUsers.length}</span>{" "}
        người dùng
      </p>

      <div className="flex gap-2">
        <button
          disabled={isPrevDisabled}
          className={`cursor-pointer rounded border px-1.5 transition-colors duration-300 ${isPrevDisabled ? "border-slate-600 " : "border-slate-500 hover:bg-slate-800"}`}
          onClick={() => setPage(pagination.page - 1)}
        >
          <ChevronLeft className="size-5" />
        </button>
        {pages.map((page) => {
          const isCurrentPage = currentPage === page;

          return (
            <button
              key={page}
              className={`cursor-pointer rounded border px-2.5 py-1.5 transition-colors duration-300 ${isCurrentPage ? "bg-orange-600 text-white" : "hover:bg-orange-500 hover:text-slate-100"} `}
              onClick={() => setPage(Number(page))}
            >
              {page}
            </button>
          );
        })}
        <button
          disabled={isNextDisabled}
          className={`cursor-pointer rounded border px-1.5 transition-colors duration-300 ${isNextDisabled ? "border-slate-600" : "border-slate-500 hover:bg-slate-800"} `}
          onClick={() => setPage(pagination.page + 1)}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

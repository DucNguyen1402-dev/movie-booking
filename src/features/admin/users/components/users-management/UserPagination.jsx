import { useUsersContext } from "../../contexts/UsersContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UserPagination({}) {
  const {
    usersStates: { users },
    userPagination: { setPage, pagination },
  } = useUsersContext();

  const totalPages = Math.ceil(users.length / pagination.size);
  const totalUsers = users.length;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const displayStart =
    totalUsers === 0 ? 0 : (pagination.page - 1) * pagination.size + 1;

  const displayEnd = Math.min(pagination.page * pagination.size, totalUsers);

  const currentPage = pagination.page;
  return (
    <div className="flex items-center justify-between text-sm text-slate-400">
      <p className="text-sm text-slate-400">
        Hiển thị{" "}
        <span className="font-medium text-slate-200">
          {displayStart}-{displayEnd}
        </span>{" "}
        trên <span className="font-medium text-slate-200">{users.length}</span>{" "}
        người dùng
      </p>

      <div className="flex gap-2">
        <button
          className="cursor-pointer rounded border px-2 py-1 transition-colors duration-300 hover:bg-slate-800"
          onClick={() => setPage(pagination.page - 1)}
        >
          <ChevronLeft className="size-5" />
        </button>
        {pages.map((page) => {
          const isCurrentPage = currentPage === page;

          return (
            <button
              key={page}
              className={`cursor-pointer rounded border border-slate-400 px-3 py-2 transition-colors duration-300 ${isCurrentPage ? "bg-orange-500 text-white" : "hover:bg-orange-500 hover:text-slate-100"}`}
              onClick={() => setPage(Number(page))}
            >
              {page}
            </button>
          );
        })}
        <button
          className="cursor-pointer rounded border px-2 py-1 transition-colors duration-300 hover:bg-slate-800"
          onClick={() => setPage(pagination.page + 1)}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

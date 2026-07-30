import { PaginationSelect } from "@shared/pagination";
import { ArrowDown, ArrowUp, Search } from "lucide-react";

import { useDashboardContext } from "@features/admin/dashboard/contexts";
import { Button } from "@components/admin/ui";
import { Input } from "@components/admin/ui/form";

const RevenueToolbar = () => {
  const {
    revenueRanking: { onSearchMovie, onSortClick, params },
    pagination,
  } = useDashboardContext();

  const isDescending = params.sortDesc;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-md gap-4">
        <Input
          leftIcon={Search}
          value={params.keyword}
          onChange={(e) => onSearchMovie(e.target.value)}
          placeholder="Tìm tên phim..."
          inputClassName="hover:border-indigo-500 bg-slate-950/40 hover:ring-2 hover:ring-indigo-500/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 pl-7 py-2.5"
          wrapperClassName="grow"
        />

        <PaginationSelect
          onChange={(e) => pagination.actions.setSize(e.target.value)}
          value={pagination.state.currentSize}
        />
      </div>
      <Button
        onClick={onSortClick}
        size="sm"
        icon={isDescending ? ArrowDown : ArrowUp}
        className="w-38 border border-slate-700/50 bg-slate-900/40 font-medium text-slate-200 shadow-sm backdrop-blur-sm hover:border-slate-600 hover:bg-slate-900/80 hover:text-white"
      >
        {isDescending ? "Desc Revenue" : "Asc Revenue"}
      </Button>
    </div>
  );
};

export default RevenueToolbar;

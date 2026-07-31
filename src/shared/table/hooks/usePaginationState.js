import { useRef, useState } from "react";
export function usePaginationState({ pageSize = 10 }) {
  const [pagination, setPagination] = useState({ page: 1, size: pageSize });
  const skipNextPageResetRef = useRef(true);

  const setSkipNextPageResetRef = (boolean) =>
    (skipNextPageResetRef.current = boolean);
  return {
    pagination,
    setPagination,
    skipNextPageResetRef,
    setSkipNextPageResetRef,
  };
}

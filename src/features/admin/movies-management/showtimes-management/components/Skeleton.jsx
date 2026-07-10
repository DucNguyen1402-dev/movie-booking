import React from "react";

// Giả lập dữ liệu lồng nhau phức tạp bằng cách render nhiều skeleton rạp
const NestedLayoutSkeleton = () => {
  return (
    <div className="mx-auto h-full w-full animate-pulse space-y-10 rounded-xl border border-neutral-100 bg-white p-10 shadow-sm">
      {/* Header Rạp: Logo + Tên + Badge suất chiếu */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-neutral-200" />
          <div className="space-y-2">
            <div className="h-6 w-24 rounded-md bg-neutral-200" />
            <div className="h-4 w-16 rounded-md bg-neutral-200" />
          </div>
        </div>
        <div className="h-10 w-28 rounded-full bg-neutral-200" />
      </div>

      <div className="space-y-6 pb-8 border-b border-gray-300">
        <div className="flex items-center gap-8">
          <div className="h-8 w-28 rounded-sm bg-neutral-200" />
          <div className="h-5 w-40 rounded-sm bg-neutral-200" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="min-h-40 space-y-4 rounded-xl bg-neutral-400 p-6 shadow-inner"
            >
              <div className="flex items-center justify-between">
                <div className="h-6 w-20 rounded-md bg-neutral-200" />
                <div className="h-5 w-12 rounded-md bg-neutral-200" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded-md bg-neutral-200" />
                <div className="h-4 w-11/12 rounded-md bg-neutral-200" />
                <div className="h-4 w-3/4 rounded-md bg-neutral-200" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <div className="h-8 w-8 rounded-md bg-neutral-200" />
                <div className="h-8 w-8 rounded-md bg-neutral-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NestedLayoutSkeleton;

import AddForm from "@features/admin/movies-management/add/components/AddForm/AddForm"
export default function AddMovie() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 pb-10">
      <div className="mx-auto min-w-4xl space-y-8 rounded-lg bg-gray-50 p-8 pb-2 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-wider text-gray-900">
            Thông tin Phim
          </h2>
          <p className="text-sm text-gray-600">
            Điền thông tin đầy đủ và chính xác cho phim bạn muốn thêm
          </p>
        </div>
       <AddForm />
      
      </div>
    </div>
  );
}

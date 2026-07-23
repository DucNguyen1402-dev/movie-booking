import { EditHeader, FormEdit } from "@features/admin/movies/edit/components";

export default function EditMovie() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-20 pt-8 pb-15 text-gray-100">
      <div className="mx-auto max-w-6xl space-y-8 ">
        <EditHeader />
        <FormEdit />
      </div>
    </div>
  );
}

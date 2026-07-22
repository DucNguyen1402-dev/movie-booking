import EditHeader from "@features/admin/movies-management/edit/components/EditHeader/EditHeader";
import FormEdit from "@features/admin/movies-management/edit/components/FormEdit/FormEdit";

export default function EditMovie() {
  
  return (
    <div className="mx-auto min-h-screen space-y-8 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-20 pt-8 pb-15 text-gray-100">
      <EditHeader />
      <FormEdit />
    </div>
  );
}

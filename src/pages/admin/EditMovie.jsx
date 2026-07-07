import EditHeader from "@features/admin/edit-movie/components/EditHeader/EditHeader";
import FormEdit from "@features/admin/edit-movie/components/FormEdit/FormEdit";

export default function EditMovie() {
  return (
    <div className="mx-auto min-h-screen space-y-8 bg-[#0f172a] p-20 text-gray-100">
      <EditHeader />
      <FormEdit />
    </div>
  );
}

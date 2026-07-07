import EditFormFields from "./EditFormFields";
import EditImageSection from "./EditImageSection";


export default function FormEdit() {
  return (
    <form className="grid grid-cols-1 gap-6 text-slate-800 lg:grid-cols-3">
      <EditFormFields />
      <EditImageSection />
    </form>
  );
}

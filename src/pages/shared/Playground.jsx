import { Button } from "@components/admin/ui";
const confirmClasses = {
  add: "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700",
  edit: "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700",
  delete: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700",
  unsavedChanges: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700",
  default: "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700",
  leavePage: "bg-amber-600 text-white hover:bg-amber-500 active:bg-amber-700",
};

const ConfirmButton = ({ children, type = "add", ...props }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Button className={`${confirmClasses[type]}`} {...props} loading={true}>
        Hello
      </Button>
    </div>
  );
};

export default ConfirmButton;

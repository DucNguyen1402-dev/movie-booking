import Button from "./Button";
const confirmClasses = {
  add: "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700",
  edit: "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700",
  changePassword:
    "bg-violet-600 text-white hover:bg-violet-500 active:bg-violet-700",
  delete: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700",
  unsavedChanges: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700",
  default: "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700",
  leavePage: "bg-amber-600 text-white hover:bg-amber-500 active:bg-amber-700",
};

const ConfirmButton = ({ children, type = "light", ...props }) => {
  return (
    <Button className={`${confirmClasses[type]}`} {...props}>
      {children}
    </Button>
  );
};

export default ConfirmButton;

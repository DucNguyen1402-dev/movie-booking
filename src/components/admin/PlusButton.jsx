import { Plus } from "lucide-react";

export default function PlusButton({ label, className = "", ...props }) {
  return (
    <button
      className={`flex cursor-pointer items-center gap-1 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-green-500 ${className}`}
      {...props}
    >
      <Plus className="size-6" />
      <span>{label}</span>
    </button>
  );
}

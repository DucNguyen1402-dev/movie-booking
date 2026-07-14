import { Ticket } from "lucide-react";

export default function EmptyBooking() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800 py-20 text-center space-y-4">
      <Ticket className="mx-auto size-24 text-slate-600" />

      <h2 className="text-xl font-semibold text-slate-300">Chưa có vé nào</h2>

      <p className=" text-slate-500">Người dùng chưa thực hiện đặt vé.</p>
    </div>
  );
}

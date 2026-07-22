import { FolderClock } from "lucide-react";
import { useUserInfor } from "@features/admin/users/booking-infor/hooks";
import {
  EmptyBooking,
  BookingInfor,
  BookingInforSkeleton,
} from "@features/admin/users/booking-infor/components";
import {useParams} from "react-router-dom"

export default function UserBookingInfor() {
  const {account} = useParams();
  const { data: user = {}, isPending } = useUserInfor(account);

  const bookings = user.thongTinDatVe ?? [];

  let content = <BookingInfor bookings={bookings} />;

  if (isPending) {
    content = <BookingInforSkeleton />;
  } else if (bookings.length === 0) {
    content = <EmptyBooking />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-10">
        <div className="flex items-center justify-center gap-3">
          <FolderClock className="size-5" />
          <h2 className="text-lg text-slate-200">
            Lịch sử các vé mà người dùng đã đặt.
          </h2>
        </div>
        {content}
      </div>
    </div>
  );
}

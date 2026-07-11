import TableSkeleton from "./TableSkeleton";
import TableRows from "./TableRows";

export default function UserTable({ users, isPending }) {
  
  const tableContent = isPending ? (
    <TableSkeleton />
  ) : (
    <TableRows users={users} />
  );

  return (
    <table className="w-full border border-slate-700 text-sm text-slate-100">
      <thead>
        <tr className="bg-slate-800 text-left font-semibold tracking-wider">
          <th className="px-12 py-6">TÀI KHOẢN</th>
          <th>HỌ & TÊN</th>
          <th>EMAIL</th>
          <th>SĐT</th>
          <th>VAI TRÒ</th>
          <th className="text-center">HÀNH ĐỘNG</th>
        </tr>
      </thead>

      <tbody className="bg-slate-800">{tableContent}</tbody>
    </table>
  );
}

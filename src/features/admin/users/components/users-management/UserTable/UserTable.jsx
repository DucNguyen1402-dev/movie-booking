import { useLocation } from "react-router-dom";
import TableSkeleton from "./TableSkeleton";
import TableRows from "./TableRows";
import { useUsersContext } from "../../../contexts/UsersContext";


export default function UserTable() {
  const {
    usersStates: { isPending },
    userFilters: { filteredUsers},
  } = useUsersContext();

  
  const location = useLocation();
  const { newAccount = "", highlight = "none"} = location?.state ?? {};


  const tableContent = isPending ? (
    <TableSkeleton />
  ) : (
    <TableRows users={filteredUsers} newAccount = {newAccount} highlight = {highlight}/>
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

import { SearchX } from "lucide-react";

import EmptyState from "./EmptyState";

const TableEmptyState = ({ colSpan, rowClassName, ...props }) => (
  <tr className={rowClassName}>
    <td colSpan={colSpan}>
      <EmptyState icon={SearchX} {...props} />
    </td>
  </tr>
);

export default TableEmptyState;

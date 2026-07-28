import { PAGE_SIZE_OPTIONS } from "@shared/pagination";

import { Select } from "@components/admin/ui/form";
const PaginationSelect = ({ value, onChange, options = PAGE_SIZE_OPTIONS }) => (
  <Select value={value} onChange={onChange} options={options} />
);

export default PaginationSelect;

import { PAGE_SIZE_OPTIONS } from "@config/admin";

import { Select } from ".";
const PaginationSelect = ({ value, onChange, options = PAGE_SIZE_OPTIONS }) => (
  <Select value={value} onChange={onChange} options={options} />
);

export default PaginationSelect;

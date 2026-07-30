import { Select } from "@shared/fields";
import { PAGE_SIZE_OPTIONS } from "@shared/pagination";
const PaginationSelect = ({ value, onChange, options = PAGE_SIZE_OPTIONS }) => (
  <Select value={value} onChange={onChange} options={options} />
);

export default PaginationSelect;

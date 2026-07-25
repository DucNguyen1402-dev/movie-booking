import { Checkbox } from "@components/admin/ui/form";

const checkboxFields = [
  { label: "Hot", name: "hot" },
  { label: "Đang chiếu", name: "dangChieu" },
  { label: "Sắp chiếu", name: "sapChieu" },
];
const CheckboxFields = ({ control }) => {
  return checkboxFields.map((field) => (
    <Checkbox
      key={field.name}
      name={field.name}
      control={control}
      label={field.label}
    />
  ));
};

export default CheckboxFields;

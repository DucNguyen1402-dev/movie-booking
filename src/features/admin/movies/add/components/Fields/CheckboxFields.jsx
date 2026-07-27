import { CheckboxField } from "@components/admin/ui/form";

const checkboxFields = [
  { label: "Hot", name: "hot" },
  { label: "Đang chiếu", name: "dangChieu" },
  { label: "Sắp chiếu", name: "sapChieu" },
];
const CheckboxFields = ({ control }) => {
  return checkboxFields.map(({ name, label }) => (
    <CheckboxField key={name} name={name} control={control} label={label} />
  ));
};

export default CheckboxFields;

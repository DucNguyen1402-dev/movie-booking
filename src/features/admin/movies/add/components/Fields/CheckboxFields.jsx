import { CheckBox } from "@components/admin";

const checkboxFields = [
  { label: "Hot", name: "hot" },
  { label: "Đang chiếu", name: "dangChieu" },
  { label: "Sắp chiếu", name: "sapChieu" },
];

export default function CheckboxFields({ control }) {
  return checkboxFields.map((field) => (
    <CheckBox
      key={field.name}
      name={field.name}
      control={control}
      label={field.label}
    />
  ));
}

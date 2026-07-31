import { CheckboxField } from "@shared/fields";

const checkboxFields = [
  { label: "Hot", name: "hot" },
  { label: "Đang chiếu", name: "dangChieu" },
  { label: "Sắp chiếu", name: "sapChieu" },
];
const CheckboxFields = ({ control }) => {
  return (
    <div className="flex flex-wrap gap-6 self-end py-2">
      {checkboxFields.map(({ name, label }) => (
        <CheckboxField key={name} name={name} control={control} label={label} />
      ))}
    </div>
  );
};

export default CheckboxFields;

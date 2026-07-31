import { CheckboxField } from "@shared/fields";

const checkboxFields = [
  { label: "Hot", name: "hot" },
  { label: "Đang chiếu", name: "dangChieu" },
  { label: "Sắp chiếu", name: "sapChieu" },
];

const CheckboxFields = ({ control }) => {
  return (
    <div className="flex items-center gap-10">
      {checkboxFields.map(({ name, label }) => (
        <CheckboxField
          key={name}
          name={name}
          control={control}
          label={label}
          labelClassName="text-slate-200 text-[15px] ml-2.5"
        />
      ))}
    </div>
  );
};

export default CheckboxFields;

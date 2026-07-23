import CheckBox from "@components/admin/CheckBox";

const checkboxFields = [
  { label: "Hot", name: "hot" },
  { label: "đang chiếu", name: "dangChieu" },
  { label: "sắp chiếu", name: "sapChieu" },
];

export default function CheckboxField({ control }) {
  return (
    <div className ="flex items-center gap-10">
      {checkboxFields.map((field) => (
        <CheckBox
          key={field.name}
          name={field.name}
          control={control}
          label={field.label}
        />
      ))}
    </div>
  );
}

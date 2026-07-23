import { validationRules } from "@config/admin";
import { Input } from "@components/admin";

const inputFields = [
  {
    label: "Tên phim",
    name: "tenPhim",
    disabled: false,
  },
  {
    label: "Bí danh",
    name: "biDanh",
    disabled: true,
  },
  {
    label: "Trailer (Link Youtube)",
    name: "trailer",
    disabled: false,
  },
];

export default function InputFields({ errors, register }) {
  return (
    <div className="flex flex-col gap-8">
      {inputFields.map((field) => (
        <Input
          key={field.name}
          label={field.label}
          name={field.name}
          rules={validationRules[field.name]}
          error={errors[field.name]}
          register={register}
          disabled={field.disabled}
        />
      ))}
    </div>
  );
}

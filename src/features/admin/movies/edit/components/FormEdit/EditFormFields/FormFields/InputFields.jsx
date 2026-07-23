import { useMemo } from "react";
import { validationRules } from "@config/admin";
import { Input } from "@components/admin";

const generateInputFields = (errors) => [
  {
    label: "Tên phim",
    name: "tenPhim",
    rules: validationRules.tenPhim,
    error: errors.tenPhim,
    disabled: false,
  },
  {
    label: "Bí danh",
    name: "biDanh",
    disabled: true,
    rules: {},
    error: null,
  },
  {
    label: "Trailer (Link Youtube)",
    name: "trailer",
    rules: validationRules.trailer,
    error: errors.trailer,
    disabled: false,
  },
  
];

export default function InputFields({ errors, register }) {
  const inputFields = useMemo(
    () => generateInputFields(errors),
    [errors, register],
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 gap-y-8">
      {inputFields.map((field) => (
        <Input
          key={field.name}
          label={field.label}
          name={field.name}
          rules={field.rules}
          error={field.error}
          register={register}
          disabled={field.disabled}
        />
      ))}
    </div>
  );
}

import { useMemo } from "react";
import { validationRules } from "@config/admin";
import { Input } from "@components/admin";

const generateInputFields = (errors) => [
  {
    label: "Tên phim",
    name: "tenPhim",
    rules: validationRules.tenPhim,
    error: errors.tenPhim,
  },
  {
    label: "Trailer (Link Youtube)",
    name: "trailer",
    rules: validationRules.trailer,
    error: errors.trailer,
  },
];

export default function InputFields({ errors, register }) {
  const inputFields = useMemo(
    () => generateInputFields(errors),
    [errors, register],
  );

  return inputFields.map((field) => (
    <Input
      key={field.name}
      label={field.label}
      name={field.name}
      rules={field.rules}
      error={field.error}
      register={register}
    />
  ));
}

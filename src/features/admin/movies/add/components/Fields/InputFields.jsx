import { validationRules } from "@config/admin";

import { Input } from "@components/admin/ui/form";

const inputFields = [
  {
    label: "Tên phim",
    name: "tenPhim",
  },
  {
    label: "Trailer (Link Youtube)",
    name: "trailer",
  },
];

const InputFields = ({ errors, register }) => {
  return inputFields.map((field) => (
    <Input
      key={field.name}
      label={field.label}
      name={field.name}
      rules={validationRules[field.name]}
      error={errors[field.name]}
      register={register}
    />
  ));
};

export default InputFields;

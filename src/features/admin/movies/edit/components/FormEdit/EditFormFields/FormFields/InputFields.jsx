import { validationRules } from "@config/admin";

import { FormLabel, Input } from "@components/admin/ui/form";

const inputFields = [
  {
    label: "Tên phim",
    name: "tenPhim",
    disabled: false,
    required: true,
  },
  {
    label: "Bí danh",
    name: "biDanh",
    disabled: true,
    required: false,
  },
  {
    label: "Trailer (Link Youtube)",
    name: "trailer",
    disabled: false,
    required: false,
  },
];

const InputFields = ({ errors, register }) =>
  inputFields.map((field) => (
    <div className="flex flex-col gap-3" key={field.name}>
      <FormLabel htmlFor={field.name} required={field.required}>
        {field.label}
      </FormLabel>
      <Input
        id={field.name}
        disabled={field.disabled}
        {...register(field.name, validationRules[field.name])}
        error={errors[field.name]?.message}
      />
    </div>
  ));

export default InputFields;

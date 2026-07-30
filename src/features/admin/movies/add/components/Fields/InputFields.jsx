import { FormLabel, Input } from "@shared/fields";

import { movieValidationRules } from "@features/admin/movies/config";

const inputFields = [
  {
    label: "Tên phim",
    name: "tenPhim",
    required: true,
  },
  {
    label: "Trailer (Link Youtube)",
    name: "trailer",
    required: false,
  },
];

const InputFields = ({ errors, register }) => {
  return inputFields.map((field) => (
    <div key={field.name} className="flex flex-col gap-3">
      <FormLabel htmlFor={field.name} required={field.required}>
        {field.label}
      </FormLabel>
      <Input
        id={field.name}
        {...register(field.name, movieValidationRules[field.name])}
        error={errors[field.name]?.message}
      />
    </div>
  ));
};

export default InputFields;

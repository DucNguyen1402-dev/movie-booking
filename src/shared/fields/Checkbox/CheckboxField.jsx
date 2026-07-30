import { Controller } from "react-hook-form";

import { Checkbox } from ".";

const CheckboxField = ({ control, name, label, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { name, ref, value, onChange } }) => (
        <Checkbox
          name={name}
          ref={ref}
          checked={!!value}
          onCheckedChange={onChange}
          {...props}
        >
          {label}
        </Checkbox>
      )}
    />
  );
};

CheckboxField.displayName = "CheckboxField";
export default CheckboxField;

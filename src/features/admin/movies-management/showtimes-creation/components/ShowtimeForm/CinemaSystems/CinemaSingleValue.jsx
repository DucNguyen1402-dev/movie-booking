import { components } from "react-select";

export function CinemaSingleValue(props) {
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-3">
        <img
          src={props.data.logo}
          alt={props.data.label}
          className="h-6 w-6 object-contain"
        />

        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
}
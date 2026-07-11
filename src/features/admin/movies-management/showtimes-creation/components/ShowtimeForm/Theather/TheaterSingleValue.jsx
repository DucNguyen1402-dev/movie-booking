import { components } from "react-select";

export default function TheaterSingleValue(props) {
  return (
    <components.SingleValue {...props}>
      <div>
        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
}

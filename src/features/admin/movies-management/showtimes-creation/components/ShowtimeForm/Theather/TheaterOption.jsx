import { components } from "react-select";

export default function TheaterOption(props) {
  return (
    <components.Option {...props}>
      <div>
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );
}

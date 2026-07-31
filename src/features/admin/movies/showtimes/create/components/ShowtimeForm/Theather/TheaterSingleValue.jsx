import { components } from "react-select";

const TheaterSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      <div>
        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
};

export default TheaterSingleValue;

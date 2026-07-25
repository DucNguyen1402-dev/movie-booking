import { components } from "react-select";

const TheaterOption = (props) => {
  return (
    <components.Option {...props}>
      <div>
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );
};

export default TheaterOption;

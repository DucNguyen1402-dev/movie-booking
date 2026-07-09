import { components } from "react-select";
import { MapPin } from "lucide-react";

export default function ClusterOption(props) {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-6 border-b border-gray-300">
        <span>{props.data.label}</span>
        <span className="text-[15px] text-gray-500 inline-flex gap-1">
          <MapPin className ="shrink-0 size-4  text-orange-600"/> 
          <span>{props.data.address}</span>
        </span>
      </div>
    </components.Option>
  );
}

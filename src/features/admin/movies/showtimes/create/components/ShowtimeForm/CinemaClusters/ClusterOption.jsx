import { components } from "react-select";

import { MapPin } from "lucide-react";

export default function ClusterOption(props) {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-6 border-b border-gray-600 pb-2">
        <span>{props.data.label}</span>
        <div className="inline-flex gap-1 text-[15px]">
          <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-sky-500 ">
            <MapPin className="size-3 font-bold text-slate-200" />
          </div>

          <span>{props.data.address}</span>
        </div>
      </div>
    </components.Option>
  );
}

import { components } from "react-select";


export default function ClusterSingleValue(props) {

    return (
       <components.SingleValue {...props}>
        <div className ="flex items-center gap-3">
            <span>{props.data.label}</span>
            <span>-</span>
            <span>{props.data.address}</span>
        </div>
       </components.SingleValue>
    )
}
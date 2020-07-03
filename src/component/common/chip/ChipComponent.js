import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

export default function ChipComponent(props){
    return(
        <Chip
            avatar={<Avatar alt={props.alt} src={props.src} />}
            label={props.label}
            onDelete={props.onDelete}
        />
    );
}
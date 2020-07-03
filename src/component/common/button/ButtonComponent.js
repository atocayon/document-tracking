import React from "react";
import Button from "@material-ui/core/Button";

export default function ButtonComponent(props) {

    return(
        <Button variant={props.variant} color={props.color} size={props.size} disabled={props.disabled} >
            {props.text}
        </Button>
    );
}
import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export default function TextArea(props) {
  return (
    <TextareaAutosize
      aria-label="empty textarea"
      placeholder={props.placeholder}
      style={{
        width: "50vw",
        height: "20vh",
        padding: "1vw",
        borderRadius: "5px"
      }}
      disabled={props.disabled}
    />
  );
}

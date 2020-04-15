import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export default function TextArea(props) {
  return (
      <>
          <TextareaAutosize
              name={props.name}
              aria-label="empty textarea"
              placeholder={props.placeholder}
              style={{
                  width: "100%",
                  height: "20vh",
                  padding: "1vw",
                  borderRadius: "5px"
              }}
              disabled={props.disabled}
              onChange={props.onChange}
          />
          <br />
          {props.error && (<span style={{color: "red"}}><small>Note is required</small></span>)}
      </>

  );
}

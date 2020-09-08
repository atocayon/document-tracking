import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CircularProgressComponent() {
  return (
    <>
      <div
        className={"loading"}
        style={{
          display: "block",
          margin: "auto",
          textAlign: "center",
          marginTop: "30vh",
        }}
      >
        <h5>
          <CircularProgress />
          <br />
          Please wait...
        </h5>
      </div>
    </>
  );
}

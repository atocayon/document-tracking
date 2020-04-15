import React from "react";
import InputField from "../../common/textField/InputField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonComponent from "../../common/button/ButtonComponent";
export default function TrackDocument() {
  return (
    <Paper
      elevation={3}
      style={{
        paddingLeft: "2vw",
        paddingTop: "5vh",
        paddingBottom: "2vh",
        marginTop: 70,
          height: "100vh"
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <InputField
            id={"tackDocument"}
            label={"Tracking Number"}
            variant={"outlined"}
          />
        </Grid>
        <Grid item xs={3}>
          <ButtonComponent
            variant={"contained"}
            text={"Track"}
            size={"large"}
            color={"primary"}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <ButtonComponent
            variant={"outlined"}
            text={"Scan"}
            size={"large"}
            color={"primary"}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

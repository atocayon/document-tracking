import React from "react";
import Grid from "@material-ui/core/Grid";
import InputField from "../../common/textField/InputField";
import ButtonComponent from "../../common/button/ButtonComponent";
import Paper from "@material-ui/core/Paper";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import TextArea from "../../common/textArea/TextArea";

export default function AddDocument() {
  return (
    <Paper
      elevation={3}
      style={{
        paddingLeft: "2vw",
        paddingRight: "2vw",
        paddingTop: "2vh",
        paddingBottom: "2vh",
        marginTop: "2vh"
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
            ROUTING SLIP
          </h1>
          Note: To be attached to any communications, vouchers and any other
          document for transmission.
          <br />
          (To be filled-up by requesting party)
        </Grid>

        <Grid item xs={4}>
          <InputField
            id={"tackDocument"}
            label={"Tracking Number"}
            variant={"filled"}
            defaultValue={"132789asd654"}
            disabled={true}
          />
        </Grid>

        <Grid item xs={8}></Grid>

        <Grid item xs={4}>
          <InputField
            id={"tackDocument"}
            label={"Requesting Party"}
            variant={"filled"}
            defaultValue={"Originating Person/Office"}
            disabled={true}
          />
        </Grid>

        <Grid item xs={4}>
          <InputField
            id={"tackDocument"}
            label={"Subject"}
            variant={"outlined"}
          />
        </Grid>

        <Grid item xs={4}>
          <InputField
            id={"tackDocument"}
            label={"Date/Time Forwarded"}
            variant={"filled"}
            defaultValue={"Date and Time"}
            disabled={true}
          />
        </Grid>

        <Grid item xs={12}>
          <h2>ACTION REQUIRED</h2>
        </Grid>

        <Grid item xs={12}>
          <FormGroup row>
            <CheckBox
              checked={false}
              onChange={() => {}}
              value={""}
              label={"For Approval"}
            />

            <CheckBox
              checked={false}
              onChange={() => {}}
              value={""}
              label={"For Signature"}
            />

            <CheckBox
              checked={false}
              onChange={() => {}}
              value={""}
              label={"For Endorsement"}
            />

            <CheckBox
              checked={false}
              onChange={() => {}}
              value={""}
              label={"For Recommendation"}
            />

            <CheckBox
              checked={false}
              onChange={() => {}}
              value={""}
              label={"For Action"}
            />

            <CheckBox
              checked={false}
              onChange={() => {}}
              value={""}
              label={"For Comment"}
            />

            <CheckBox
              checked={false}
              onChange={() => {}}
              value={""}
              label={"For Information"}
            />

            <CheckBox
              checked={false}
              onChange={() => {}}
              value={""}
              label={"For File"}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <h2>DESTINATION</h2>
        </Grid>
        <Grid item xs={4}>
          <InputField
            id={"tackDocument"}
            label={"Name/Office"}
            variant={"outlined"}
          />
        </Grid>
        <Grid item xs={8}></Grid>

        <Grid item xs={12}>
          <h2>NOTE:</h2>
          <TextArea placeholder={"Write Your Note Here"} />
        </Grid>

        <Grid item xs={12}>
          <div style={{ textAlign: "right" }}>
            <ButtonComponent
              variant={"contained"}
              color={"primary"}
              size={"large"}
              text={"Finalize"}
            />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

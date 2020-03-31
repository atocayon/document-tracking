import React from "react";
import { FormGroup, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import InputField from "../../common/textField/InputField";
import ButtonComponent from "../../common/button/ButtonComponent";
import CheckBox from "../../common/checkbox/CheckBox";
import TextArea from "../../common/textArea/TextArea";
export default function ReleaseDocument() {
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
              text={"Release"}
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
          <Grid item xs={12}>
            <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
              ROUTING SLIP
            </h1>
            Note: To be attached to any communications, vouchers and any other
            document for transmission.
          </Grid>
          <Grid item xs={4}>
            <InputField
              id={""}
              label={"Originating Person/Office"}
              variant={"filled"}
              disabled={true}
              defaultValue={"Person Name and Office"}
            />
          </Grid>
          <Grid item xs={4}>
            <InputField
              id={""}
              label={"Subject"}
              variant={"filled"}
              disabled={true}
              defaultValue={"Document Subject"}
            />
          </Grid>
          <Grid item xs={4}>
            <InputField
              id={""}
              label={"Date and Time Forwarded"}
              variant={"filled"}
              disabled={true}
              defaultValue={"Date and Time Forwarded"}
            />
          </Grid>

          <Grid item xs={12}>
            <h2>ACTION REQUIRED</h2>
            <FormGroup row>
              <CheckBox
                checked={true}
                onChange={() => {}}
                value={""}
                label={"For Approval"}
              />

              <CheckBox
                checked={true}
                onChange={() => {}}
                value={""}
                label={"For Recommendation"}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={4}>
            <InputField
              id={""}
              label={"Receiver"}
              variant={"filled"}
              disabled={true}
              defaultValue={"Name/Division/Section/Unit"}
            />
          </Grid>

          <Grid item xs={4}>
            <InputField
              id={""}
              label={"Date/Time Received"}
              variant={"filled"}
              disabled={true}
              defaultValue={"Date Time Received"}
            />
          </Grid>

          <Grid item xs={12}>
            <h2>NOTE</h2>
            <TextArea placeholder={"Note Attached"} disabled={true} />
          </Grid>

          {/*<Grid item xs={12}>*/}
          {/*    <h2>DESTINATION</h2>*/}

          {/*</Grid>*/}
          {/*<Grid item xs={4}>*/}
          {/*    <InputField*/}
          {/*        id={""}*/}
          {/*        label={"Person/Office/Division"}*/}
          {/*        variant={"outlined"}*/}

          {/*    />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12}>*/}
          {/*    <h2>ACTION TAKEN</h2>*/}
          {/*    <TextArea placeholder={"Write your action here..."} />*/}
          {/*</Grid>*/}

          <Grid item xs={12}>
            <div style={{ textAlign: "right" }}>
              <ButtonComponent
                variant={"contained"}
                color={"primary"}
                size={"large"}
                text={"RETURN"}
                disabled={true}
              />
              &nbsp;&nbsp;
              <ButtonComponent
                variant={"contained"}
                color={"primary"}
                size={"large"}
                text={"FORWARD"}
                disabled={true}
              />
              &nbsp;&nbsp;
              <ButtonComponent
                variant={"contained"}
                color={"primary"}
                size={"large"}
                text={"END"}
                disabled={true}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
}

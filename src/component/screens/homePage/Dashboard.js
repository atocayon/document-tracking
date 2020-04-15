import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import addImage from "../../../img/add.jpg";
import tracking from "../../../img/tracking.png";
import receive from "../../../img/recieve.jpg";
import release from "../../../img/release.jpg";
import CardComponent from "../../common/card/CardComponent";


function Dashboard(props) {

  return (
    <div>
      <Paper
        elevation={3}
        style={{
          paddingLeft: "2vw",
          paddingRight: "2vw",
          paddingTop: "5vh",
          paddingBottom: "3vh",
            marginTop: 70
        }}
      >
        <h1 style={{ color: "#2196F3" }}>Hello, {props.user.username} !</h1>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <CardComponent
              cardHeaderText={"T"}
              image={tracking}
              title={"Track Document"}
              cardContent={
                "Track a document by typing or scanning the tracking number assigned."
              }
            />
          </Grid>
          <Grid item xs={4}>
            <CardComponent
              cardHeaderText={"A"}
              image={addImage}
              title={"Add Document"}
              cardContent={
                "Add new document to be routed in any division or section you desire."
              }
            />
          </Grid>
          <Grid item xs={4}>
            <CardComponent
              cardHeaderText={"R"}
              image={receive}
              title={"Receive Document"}
              cardContent={
                "Receive document by typing or scanning the tracking number assigned."
              }
            />
          </Grid>
          <Grid item xs={4}>
            <CardComponent
              cardHeaderText={"R"}
              image={release}
              title={"Release Document"}
              cardContent={
                "Release document by typing or scanning the tracking number assigned."
              }
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Dashboard;

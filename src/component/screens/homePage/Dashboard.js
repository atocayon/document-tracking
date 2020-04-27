import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import InputField from "../../common/textField/InputField";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";

function Dashboard(props) {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Grid container spacing={3}>
      <PrimarySearchAppBar />

      <Grid item xs={2}>
        <SideBarNavigation
          dashboard={true}
          user={props.user}
          open={open}
          setOpen={setOpen}
          handleClick={handleClick}
        />
      </Grid>
      <Grid item xs={8}>
        <Paper
          elevation={3}
          style={{
            paddingBottom: "3vh",
            marginTop: 70,
            height: "100vh",
            overflow: "auto"
          }}
        >
          {/*<h1 style={{ color: "#2196F3" }}>Hello, {props.user.username} !</h1>*/}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div
                className={"jumbotron"}
                style={{ paddingTop: "3vh", paddingBottom: "2vh" }}
              >
                <div className={"row"}>
                  <div className={"col-md-2"}>
                    <div className={"row"}>
                      <div className={"col-md-6"}></div>
                      <div className={"col-md-6"}>
                        <div style={{ textAlign: "right" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-6"}>
                    <InputField
                      id={"tackDocument"}
                      label={"Document Tracking Number"}
                      variant={"outlined"}
                    />

                  </div>
                  <div className={"col-md-4"}>
                    <button className={"btn btn-lg btn-info"}>Track</button>
                    &nbsp;&nbsp;&nbsp;
                    <button className={"btn btn-lg btn-outline-info"}>Receive</button>
                  </div>
                </div>
              </div>

              <div className={"row"}>
                <div className={"col-md-12"}>
                  <div style={{ textAlign: "center", marginTop: "30vh" }}>
                    <h6 style={{ color: "#9E9E9E" }}>
                      Document track / information will show here
                    </h6>
                  </div>
                </div>
              </div>
            </Grid>

            {/*<Grid item xs={4}>*/}
            {/*  <CardComponent*/}
            {/*    cardHeaderText={"T"}*/}
            {/*    image={tracking}*/}
            {/*    title={"Track Document"}*/}
            {/*    cardContent={*/}
            {/*      "Track a document by typing or scanning the tracking number assigned."*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Grid>*/}
            {/*<Grid item xs={4}>*/}
            {/*  <CardComponent*/}
            {/*    cardHeaderText={"A"}*/}
            {/*    image={addImage}*/}
            {/*    title={"Add Document"}*/}
            {/*    cardContent={*/}
            {/*      "Add new document to be routed in any division or section you desire."*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Grid>*/}
            {/*<Grid item xs={4}>*/}
            {/*  <CardComponent*/}
            {/*    cardHeaderText={"R"}*/}
            {/*    image={receive}*/}
            {/*    title={"Receive Document"}*/}
            {/*    cardContent={*/}
            {/*      "Receive document by typing or scanning the tracking number assigned."*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Grid>*/}
            {/*<Grid item xs={4}>*/}
            {/*  <CardComponent*/}
            {/*    cardHeaderText={"R"}*/}
            {/*    image={release}*/}
            {/*    title={"Release Document"}*/}
            {/*    cardContent={*/}
            {/*      "Release document by typing or scanning the tracking number assigned."*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Grid>*/}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import Home from "./screens/homePage/Home";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "./common/navbar/PrimarySearchAppBar";
import { Route, Switch } from "react-router-dom";
import SideBarNavigation from "./common/sideBarNavigation/SideBarNavigation";

import TrackDocument from "./screens/trackDocument/TrackDocument";
import AddDocument from "./screens/addDocument/AddDocument";
import ReceiveDocument from "./screens/receiveDocument/ReceiveDocument";
import ReleaseDocument from "./screens/releaseDocument/ReleaseDocument";
import PendingForRelease from "./screens/pendingForRelease/PendingForRelease";
import MyDocuments from "./screens/myDocuments/MyDocuments";
import SectionDocuments from "./screens/sectionDocuments/SectionDocuments";
import ProcessedDocuments from "./screens/processedDocuments/ProcessedDocuments";
import LoginModal from "./screens/login/LoginModal";
import Profile from "./screens/profile/Profile";
import NewUserForm from "./screens/newUserForm/NewUserForm";
import NotFoundPage from "./screens/pageNotfound/NotFoundPage";

import UserManagement from "./screens/userManagement/UserManagement";
import UpdateProfile from "./screens/updateProfile/UpdateProfile";
import { getFromStorage } from "./storage";
import axios from "axios";
import Reactotron from "reactotron-react-js";


function App() {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      axios
        .get("http://localhost:4000/dts/user/" + token)
        .then(_user => {
          setUser(_user.data);
        })
        .catch(err => {
          alert(err);
        });
    } else {
      alert("Session Expired");
    }
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div>
        <Grid container spacing={3}>
          <PrimarySearchAppBar user={user} />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <SideBarNavigation
              open={open}
              setOpen={setOpen}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={8}>
            <Switch>
              <Route
                path={"/"}
                exact
                render={props => <Home {...props} user={user} />}
              />
              <Route path={"/login"} component={LoginModal} />
              <Route path="/fetchUsersBySection" component={UserManagement} />
              <Route path="/trackDocument" component={TrackDocument} />
              <Route path="/addDocument" component={AddDocument} />
              <Route path="/receiveDocument" component={ReceiveDocument} />
              <Route path="/releasedDocument" component={ReleaseDocument} />
              <Route path="/pending" component={PendingForRelease} />
              <Route path="/myDocuments" component={MyDocuments} />
              <Route path="/sectionDocuments" component={SectionDocuments} />
              <Route
                path="/processedDocuments"
                component={ProcessedDocuments}
              />
              <Route path={"/user/:id"} component={Profile} />
              <Route path={"/update/:id"} component={UpdateProfile} />
              <Route path={"/users"} component={UserManagement} />
              <Route path={"/registration"} render={props => <NewUserForm {...props} section={user.section}/>} />
              <Route component={NotFoundPage} />
            </Switch>
          </Grid>
          <Grid item xs={2}>
            {/*<UserList user={users} />*/}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;

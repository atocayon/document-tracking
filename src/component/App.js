import React, { useEffect, useState } from "react";
import Home from "./screens/homePage/Home";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "./common/navbar/PrimarySearchAppBar";
import { Redirect, Route, Switch } from "react-router-dom";
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
import RegistrationForm from "./screens/newUserForm/RegistrationForm";
import NotFoundPage from "./screens/pageNotfound/NotFoundPage";
import UserManagement from "./screens/userManagement/UserManagement";
import UpdateProfile from "./screens/updateProfile/UpdateProfile";
import { getFromStorage } from "./storage";

import { withSnackbar } from "notistack";
function App(props) {
  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (!obj || !obj.token) {
      props.enqueueSnackbar("No session found...");
    }
  }, []);

  return (
    <div>
      <div>
        <Grid container spacing={3}>
          <PrimarySearchAppBar />
        </Grid>

        <Switch>
          <Route path={"/"} exact component={Home} />
          <Route path={"/login"} component={LoginModal} />
          <Route path="/fetchUsersBySection" component={UserManagement} />
          <Route path="/trackDocument" component={TrackDocument} />
          <Route path="/addDocument" component={AddDocument} />
          <Route path="/receiveDocument" component={ReceiveDocument} />
          <Route path="/releasedDocument" component={ReleaseDocument} />
          <Route path="/pending" component={PendingForRelease} />
          <Route path="/myDocuments" component={MyDocuments} />
          <Route path="/sectionDocuments" component={SectionDocuments} />
          <Route path="/processedDocuments" component={ProcessedDocuments} />
          <Route path={"/user/:id"} component={Profile} />
          <Route path={"/user"} component={Profile} />
          <Route path={"/update/:id"} component={UpdateProfile} />
          <Route path={"/users"} component={UserManagement} />
          <Route path={"/registration"} component={RegistrationForm} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
}

export default withSnackbar(App);

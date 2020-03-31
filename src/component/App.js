import React, { useEffect, useState } from "react";
import Home from "./screens/homePage/Home";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "./common/navbar/PrimarySearchAppBar";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import SideBarNavigation from "./common/sideBarNavigation/SideBarNavigation";
import UserList from "./common/userList/UserList";
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
import NotFoundPage from "./screens/pageNotfound/NotFoundPage";
import { connect } from "react-redux";
import { userLogin } from "../redux/actions/login";
import { loadUsers } from "../redux/actions/fetchUsersBySection";
import Reactotron from "reactotron-react-js";
import UserManagement from "./screens/userManagement/UserManagement";
import UpdateProfile from "./screens/updateProfile/UpdateProfile";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30vw"
  }
};

function App({ users, userLogin, loadUsers, clearProfile, ...props }) {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState([]);


  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div>
        <ToastContainer autoClose={3000} hideProgressBar />
        <Grid container spacing={3}>
          <PrimarySearchAppBar user={user} />
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={2}>
            <SideBarNavigation
              user={user}
              open={open}
              setOpen={setOpen}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={8}>
            <Switch>
              <Route path={"/"} exact component={Home} />
              <Route path={"/login"} component={LoginModal} />
              <Route path="/fetchUsersBySection" component={UserManagement}  />
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
              <Route  path={"/update/:id"} component={UpdateProfile}/>
              <Route path={"/users/:section"} component={UserManagement} />

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

function mapStateToProps(state) {
  return {
    users: state.user
  };
}

const mapDispatchToProps = {
  userLogin,
  loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

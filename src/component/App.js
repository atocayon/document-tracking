import React, { useEffect } from "react";
import Home from "./screens/homePage/Home";
import { Route, Switch } from "react-router-dom";
import AddDocument from "./screens/addDocument/AddDocument";
import PendingForRelease from "./screens/pendingForRelease/PendingForRelease";
import ManageDocCategory from "./screens/manageDocCategory/ManageDocCategory";
import SectionDocuments from "./screens/sectionDocuments/SectionDocuments";
import ProcessedDocuments from "./screens/processedDocuments/ProcessedDocuments";
import LoginModal from "./screens/login/Login";
import Profile from "./screens/profile/Profile";
import RegistrationForm from "./screens/newUserForm/RegistrationForm";
import NotFoundPage from "./screens/pageNotfound/NotFoundPage";
import UserManagement from "./screens/userManagement/UserManagement";
import UpdateProfile from "./screens/updateProfile/UpdateProfile";
import UserFolder from "./screens/folder/UsersFolder";
import { getFromStorage } from "./storage";
import { withSnackbar } from "notistack";
import Drafts from "./screens/drafts/Drafts";
import DocumentInfo from "./screens/documentInfo/DocumentInfo";
import PendingDocumentInfo from "./screens/pendingForRelease/PendingDocumentInfo";
import "../../src/styles/login.css";
function App(props) {
  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (!obj || !obj.token) {
      props.enqueueSnackbar("NMP | Document Tracking System");
    }
  }, []);

  return (
    <div>
      <div>
        <Switch>
          <Route path={"/"} exact component={Home} />
          <Route path={"/login"} component={LoginModal} />
          <Route path={"/fetchUsersBySection"} component={UserManagement} />
          <Route path={"/addDocument/:id"} component={AddDocument} />
          <Route path={"/addDocument"} component={AddDocument} />
          <Route path={"/pending"} component={PendingForRelease} />
          <Route path={"/doc_category"} component={ManageDocCategory} />
          <Route path={"/sectionDocuments"} component={SectionDocuments} />
          <Route path={"/processedDocuments"} component={ProcessedDocuments} />
          <Route path={"/user/:id"} component={Profile} />
          <Route path={"/user"} component={Profile} />
          <Route path={"/update/:id"} component={UpdateProfile} />
          <Route path={"/users"} component={UserManagement} />
          <Route path={"/registration"} component={RegistrationForm} />
          <Route path={"/drafts"} component={Drafts} />
          <Route path={"/doc/:doc_id"} component={DocumentInfo} />
          <Route path={"/pending_doc/:doc_id"} component={PendingDocumentInfo} />
          <Route path={"/folder/:folder"} component={UserFolder} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
}

export default withSnackbar(App);

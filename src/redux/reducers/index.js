import { combineReducers } from "redux";
import update from "./updateUserProfile";
import fetchUserById from "./fetchUserById";
import fetchAllUsers from "./fetchAllUsers";
import fetchAllSections from "./fetchAllSections";
import deleteUser from "./deleteUser";
import logout from "./logout";
import fetchDivisions from "./fetchDivisions";
import fetchDivisionById from "./fetchDivisionById";
import fetchSectionsList from "./fetchSectionsList";
import fetchSectionById from "./fetchSectionById";
import fetchDocumentTypes from "./fetchDocumentTypes";
import fetchDocumentById from "./fetchDocumentById";
import login from "./login";
const rootReducer = combineReducers({
  updateUserProfile: update,
  fetchUserById: fetchUserById,
  fetchAllUsers: fetchAllUsers,
  fetchAllSections: fetchAllSections,
  fetchDivisions: fetchDivisions,
  fetchDivisionById: fetchDivisionById,
  fetchSectionsList: fetchSectionsList,
  fetchSectionById: fetchSectionById,
  fetchDocumentTypes: fetchDocumentTypes,
  fetchDocumentById: fetchDocumentById,
  deleteUser: deleteUser,
  logout: logout,
  login: login
});

export default rootReducer;

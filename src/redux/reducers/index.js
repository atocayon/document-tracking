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
import fetchDocumentTypeById from "./fetchDocumentTypeById";
import login from "./login";
import verifyToken from "./verifyToken";
import fetchCurrentSystemUser from "./fetchCurrentSystemUser";
import userRegistration from "./userRegistration";
import fetchDocumentById from "./fetchDocumentById";
import fetchDocumentActionRequired from "./fetchDocumentActionRequired";
import fetchDocumentId from "./fetchDocumentId";
import fetchInternalDestination from "./fetchInternalDestination";
const rootReducer = combineReducers({
  update: update,
  fetchUserById: fetchUserById,
  fetchAllUsers: fetchAllUsers,
  fetchAllSections: fetchAllSections,
  fetchDivisions: fetchDivisions,
  fetchDivisionById: fetchDivisionById,
  fetchSectionsList: fetchSectionsList,
  fetchSectionById: fetchSectionById,
  fetchDocumentTypes: fetchDocumentTypes,
  fetchDocumentTypeById: fetchDocumentTypeById,
  fetchCurrentSystemUser: fetchCurrentSystemUser,
  deleteUser: deleteUser,
  logout: logout,
  login: login,
  verifyToken: verifyToken,
  userRegistration: userRegistration,
  fetchDocumentById: fetchDocumentById,
  fetchDocumentActionRequired: fetchDocumentActionRequired,
  fetchDocumentId: fetchDocumentId,
  fetchInternalDestination: fetchInternalDestination
});

export default rootReducer;

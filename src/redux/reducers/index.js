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
import newDocumentCreation from "./newDocumentCreation";
import addNewDocument from "./addNewDocument";
import addNewDocumentDraft from "./addNewDocumentDraft";
import documentTrackingNumber from "./documentTrackingNumber";
import receiveDocument from "./receiveDocument";
import notification from "./notification";
import forwardDocument from "./forwardDocument";
import afterDocumentReceive from "./afterDocumentReceive";
import trackDocument from "./trackDocument";
import fetchPendingDocuments from "./fetchPendingDocuments";
import fetchPendingDocumentInfo from "./fetchPendingDocumentInfo";
import searchBySubj from "./searchBySubj";
import expandDocLogs from "./expandDocLogs";
import fetchActiveUserList from "./fetchActiveUserList";
import onClickTrackShowMore from "./onClickTrackShowMore";
import fetchUserDocuments from "./fetchUserDocuments";
import fetchSectionDocuments from "./fetchSectionDocuments";
import fetchDocumentInfo from "./fetchDocumentInfo";
import manageDocumentCategory from "./manageDocumentCategory";
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
  fetchInternalDestination: fetchInternalDestination,
  newDocumentCreation: newDocumentCreation,
  addNewDocument: addNewDocument,
  addNewDocumentDraft: addNewDocumentDraft,
  documentTrackingNumber: documentTrackingNumber,
  receiveDocument: receiveDocument,
  notification: notification,
  forwardDocument: forwardDocument,
  afterDocumentReceive: afterDocumentReceive,
  trackDocument: trackDocument,
  fetchPendingDocuments: fetchPendingDocuments,
  fetchPendingDocumentInfo: fetchPendingDocumentInfo,
  searchBySubj: searchBySubj,
  expandDocLogs: expandDocLogs,
  fetchActiveUserList:fetchActiveUserList,
  onClickTrackShowMore: onClickTrackShowMore,
  fetchUserDocuments: fetchUserDocuments,
  fetchSectionDocuments: fetchSectionDocuments,
  fetchDocumentInfo: fetchDocumentInfo,
  manageDocumentCategory: manageDocumentCategory
});

export default rootReducer;

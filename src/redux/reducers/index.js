import { combineReducers } from "redux";
import update from "./updateUserProfile";
import fetchUserById from "./fetchUserById";
import fetchAllUsers from "./fetchAllUsers";
import fetchAllSections from "./fetchAllSections";
import logout from "./logout";
import fetchDivisions from "./fetchDivisions";
import fetchSectionsList from "./fetchSectionsList";
import fetchDocumentTypes from "./fetchDocumentTypes";
import login from "./login";
import verifyToken from "./verifyToken";
import fetchCurrentSystemUser from "./fetchCurrentSystemUser";
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
import searchBySubj from "./searchBySubj";
import expandDocLogs from "./expandDocLogs";
import fetchActiveUserList from "./fetchActiveUserList";
import onClickTrackShowMore from "./onClickTrackShowMore";
import fetchUserDocuments from "./fetchUserDocuments";
import fetchSectionDocuments from "./fetchSectionDocuments";
import fetchDocumentInfo from "./fetchDocumentInfo";
import manageDocumentCategory from "./manageDocumentCategory";
import addNewDocCategory from "./addNewDocCategory";
import saveEditDocCategory from "./saveEditDocCategory";
import deleteDocCategory from "./deleteDocCategory";
import listSectionDocCategory from "./listSectionDocCategory";
import fetchProcessedDocument from "./fetchProcessedDocument";
import fetchSectionUsers from "./fetchSectionUsers";
import trackOrSearchOnly from "./trackOrSearchOnly";
import handleDocDissemination from "./handleDocDissemination";
import count_pending from "./count_pending";
const rootReducer = combineReducers({
  update: update,
  fetchUserById: fetchUserById,
  fetchAllUsers: fetchAllUsers,
  fetchAllSections: fetchAllSections,
  fetchDivisions: fetchDivisions,

  fetchSectionsList: fetchSectionsList,

  fetchDocumentTypes: fetchDocumentTypes,

  fetchCurrentSystemUser: fetchCurrentSystemUser,

  logout: logout,
  login: login,
  verifyToken: verifyToken,

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
  searchBySubj: searchBySubj,
  expandDocLogs: expandDocLogs,
  fetchActiveUserList: fetchActiveUserList,
  onClickTrackShowMore: onClickTrackShowMore,
  fetchUserDocuments: fetchUserDocuments,
  fetchSectionDocuments: fetchSectionDocuments,
  fetchDocumentInfo: fetchDocumentInfo,
  manageDocumentCategory: manageDocumentCategory,
  addNewDocCategory: addNewDocCategory,
  saveEditDocCategory: saveEditDocCategory,
  deleteDocCategory: deleteDocCategory,
  listSectionDocCategory: listSectionDocCategory,
  fetchProcessedDocument: fetchProcessedDocument,
  fetchSectionUsers: fetchSectionUsers,
  trackOrSearchOnly: trackOrSearchOnly,
  handleDocDissemination: handleDocDissemination,

  count_pending: count_pending,
});

export default rootReducer;

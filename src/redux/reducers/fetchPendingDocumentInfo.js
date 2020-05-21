import actionTypes from "../actions/actionTypes";

const defaultState = {
  creator: "",
  creatorSection: "",
  creatorPosition: "",
  sender: "",
  senderSection: "",
  senderPosition: "",
  senderRemarks: "",
  destinationType: "",
  subject: "",
  doc_type: "",
  note: "",
  action_req: [],
  destination: [],
};

export default function fetchPendingDocumentInfo(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PENDING_DOCUMENT_INFO:
      return Object.assign({}, state, {
        creator: action.data.creator,
        creatorSection: action.data.creatorSection,
        creatorPosition: action.data.creatorPosition,
        subject: action.data.subject,
        doc_type: action.data.type,
        note: action.data.note,
      });
    case actionTypes.FETCH_ACTION_REQUIRED_PENDING_DOCUMENT:
      return Object.assign({}, state, {
        action_req: [...action.data],
      });
    case actionTypes.FETCH_DESTINATION_PENDING_DOCUMENT:
      return Object.assign({}, state, {
        destination: [...action.data],
      });
    case actionTypes.FETCH_LAST_DOCUMENT_FORWARDER:
      return Object.assign({}, state, {
        sender: action.data.sender,
        senderSection: action.data.senderSection,
        senderPosition: action.data.senderPosition,
        senderRemarks: action.data.remarks,
        destinationType: action.data.destinationType,
      });
    default:
      return state;
  }
}

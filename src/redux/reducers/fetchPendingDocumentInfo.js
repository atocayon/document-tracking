import actionTypes from "../actions/actionTypes";

const defaultState = {
  creator: "",
  date_time_created: "",
  creatorSection: "",
  creatorPosition: "",
  destinationType: "",
  subject: "",
  doc_type: "",
  note: "",
  action_req: [],
  destination: [],
  doc_route_type: []
};

export default function fetchPendingDocumentInfo(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PENDING_DOCUMENT_INFO:
      return Object.assign({}, state, {
        creator: action.data.creator,
        date_time_created: action.data.date_time_created,
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

    case actionTypes.FETCH_DOC_ROUTE_TYPE:
      return Object.assign({}, state, {
        doc_route_type: [...action.data]
      });
    default:
      return state;
  }
}

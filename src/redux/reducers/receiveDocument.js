import actionTypes from "../actions/actionTypes";

const defaultState = {
  documentId: "",
  creator: "",
  sender: "",
  subject: "",
  doc_type: "",
  destination_type: "",
  note: "",
  date_time_created: "",
  date_time_forwarded: "",
  action_req: []
};

export default function receiveDocument(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_DOCUMENT:
      return Object.assign({}, state, {
        documentId: action.data.documentId,
        creator: action.data.creator,
        sender: action.data.sender,
        subject: action.data.subject,
        doc_type: action.data.doc_type,
        destination_type: action.data.destinationType,
        note: action.data.note,
        date_time_created: action.data.date_time_created,
        date_time_forwarded: action.data.date_time_forwarded
      });

    case actionTypes.ACTION_REQ:
      return Object.assign({}, state, { action_req: action.data });
    default:
      return state;
  }
}

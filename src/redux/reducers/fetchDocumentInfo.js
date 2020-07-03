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
  barcode: [],
};

export default function fetchDocumentInfo(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DOCUMENT_INFO:
      return Object.assign({}, state, {
        creator: action.data.creator,
        date_time_created: action.data.date_time_created,
        creatorSection: action.data.creatorSection,
        creatorPosition: action.data.creatorPosition,
        subject: action.data.subject,
        doc_type: action.data.type,
        note: action.data.note,
      });
    case actionTypes.FETCH_ACTION_REQUIRED_DOCUMENT_INFO:
      return Object.assign({}, state, {
        action_req: [...action.data],
      });
    case actionTypes.FETCH_DESTINATION_DOCUMENT_INFO:
      return Object.assign({}, state, {
        destination: [...action.data],
      });

    case actionTypes.FETCH_DOCUMENTS_BARCODES:
      return Object.assign({}, state, {barcode: [...action.data]});
    case actionTypes.FETCH_DOCUMENTS_BARCODE:
      return Object.assign({}, state, {barcode: [...action.data]});

    default:
      return state;
  }
}

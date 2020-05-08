import actionTypes from "../actions/actionTypes";
import Reactotron from "reactotron-react-js";
const defaultState = {
  subject: "",
  documentType: "",
  action_req: [],
  note: "",
  externalDestination: "",
  internalDestination: "",
  destination: [],
  "For Approval": false,
  "For Signature": false,
  "For Endorsement": false,
  "For Recommendation": false,
  "For Action": false,
  "For Comment": false,
  "For Information": false,
  "For File": false
};

export default function newDocumentCreation(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.ADD_DOCUMENT_INPUT_CHANGE:
      return Object.assign({}, state, {
        [action.text.name]: action.text.value
      });
    case actionTypes.CLEAR_DESTINATION:
      return Object.assign({}, state, {
        externalDestination: "",
        internalDestination: "",
        destination: []
      });

    case actionTypes.CLEAR_INTERNAL_DESTINATION_INPUT:
      return Object.assign({}, state, { internalDestination: "" });

    case actionTypes.CLEAR_EXTERNAL_DESTINATION_INPUT:
      return Object.assign({}, state, { externalDestination: "" });

    case actionTypes.ADD_DOCUMENT_ACTION_REQ:
      return Object.assign({}, state, {
        action_req: [...state.action_req, action.data.data],
        [action.data.value]: !state[action.data.value]
      });

    case actionTypes.REMOVE_DOCUMENT_ACTION_REQ:
      let arr = [...state.action_req];

      let remove = arr
        .map(item => {
          return item.value;
        })
        .indexOf(action.data.value);

      arr.splice(remove, 1);

      return Object.assign({}, state, {
        action_req: arr,
        [action.data.value]: !state[action.data.value]
      });

    case actionTypes.ADD_DOCUMENT_DESTINATION:
      return Object.assign({}, state, {
        destination: [...state.destination, action.data]
      });

    case actionTypes.REMOVE_DESTINATION:
      let destination = [...state.destination];
      destination.splice(action.index);
      return Object.assign({}, state, { destination: destination });

    case actionTypes.ADD_DOCUMENT_CREATOR:
      let creator = [...state.destination];
      creator.splice(0, 0, action.data);
      return Object.assign({}, state, { destination: creator });

    case actionTypes.CLEAR_ADD_NEW_DOCUMENT_STATE:
      return Object.assign({}, state, {
        subject: "",
        documentType: "",
        action_req: [],
        note: "",
        externalDestination: "",
        internalDestination: "",
        destination: [],
        "For Approval": false,
        "For Signature": false,
        "For Endorsement": false,
        "For Recommendation": false,
        "For Action": false,
        "For Comment": false,
        "For Information": false,
        "For File": false
      });
    default:
      return state;
  }
}

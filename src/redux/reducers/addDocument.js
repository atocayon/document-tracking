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

export default function addDocument(state = defaultState, action) {
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
    case actionTypes.ADD_DOCUMENT_ACTION_REQ:
      return Object.assign({}, state, {
        action_req: [...state.action_req, action.data],
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
    default:
      return state;
  }
}

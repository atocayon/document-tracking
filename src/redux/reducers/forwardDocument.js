import actionTypes from "../actions/actionTypes";

const defaultState = {
  destination: "",
  des: [],
  remarks: "",
};
export default function forwardDocument(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.DOCUMENT_REMARKS:
      return Object.assign({}, state, {
        [action.data.name]: action.data.value,
      });

    case actionTypes.CHANGE_DOCUMENT_DESTINATION:
      return Object.assign({}, state, {
        destination: "",
        des: [],
        remarks: "",
      });

    case actionTypes.ADD_FORWARD_DESTINATION:
      return Object.assign({}, state, { des: [...state.des, action.data] });
    case actionTypes.REMOVE_FORWARD_DESTINATION:
      let destination = [...state.des];
      destination.splice(action.index);
      return Object.assign({}, state, {des: destination});
    default:
      return state;
  }
}

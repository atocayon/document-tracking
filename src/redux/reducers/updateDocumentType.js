import actionTypes from "../actions/actionTypes";

const updateDocumentType = (state = "", action) => {
  switch (action.type) {
    case actionTypes.UPDATE_DOCUMENT_TYPE:
      return (state = action.data);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
};

export default updateDocumentType;
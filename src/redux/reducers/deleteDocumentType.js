import actionTypes from "../actions/actionTypes";

const deleteDocumentType = (state = "", action) => {
  switch (action.type) {
    case actionTypes.DELETE_DOCUMENT_TYPE:
      return (state = action.data);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
};

export default deleteDocumentType;

import actionTypes from "../actions/actionTypes";

const deleteDocumentType = (state = "", action) => {
  switch (action.type) {
    case actionTypes.DELETE_DOCUMENT_TYPE:
      return (state = action.data);

    default:
      return state;
  }
};

export default deleteDocumentType;

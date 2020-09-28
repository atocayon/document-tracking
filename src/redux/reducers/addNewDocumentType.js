import AddNewDocumentType from "../../component/screens/controlPanel/AddNewDocumentType";
import actionTypes from "../actions/actionTypes";

const addNewDocumentType = (state = "", action) => {
  switch (action.type) {
    case actionTypes.ADD_DOCUMENT_TYPE:
      return (state = action.data);

    default:
      return state;
  }
};

export default addNewDocumentType;

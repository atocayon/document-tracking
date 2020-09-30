import actionTypes from "../actions/actionTypes";

const addNewDivision = (state = "", action) => {
  switch (action.type) {
    case actionTypes.ADD_DIVISION:
      return (state = action.data);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
};

export default addNewDivision;

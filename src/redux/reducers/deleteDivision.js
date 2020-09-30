import actionTypes from "../actions/actionTypes";

const deleteDivision = (state = "", action) => {
  switch (action.type) {
    case actionTypes.DELETE_DIVISION:
      return (state = action.data);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
};

export default deleteDivision;

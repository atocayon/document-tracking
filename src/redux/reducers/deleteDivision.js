import actionTypes from "../actions/actionTypes";

const deleteDivision = (state = "", action) => {
  switch (action.type) {
    case actionTypes.DELETE_DIVISION:
      return (state = action.data);
    default:
      return state;
  }
};

export default deleteDivision;

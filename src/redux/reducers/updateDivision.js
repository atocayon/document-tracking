import actionTypes from "../actions/actionTypes";

const updateDivision = (state = "", action) => {
  switch (action.type) {
    case actionTypes.UPDATE_DIVISION:
      return (state = action.data);
    default:
      return state;
  }
};

export default updateDivision;

import actionTypes from "../actions/actionTypes";

const addNewSection = (state = "", action) => {
  switch (action.type) {
    case actionTypes.ADD_SECTION:
      return (state = action.data);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
};

export default addNewSection;

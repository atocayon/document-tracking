import actionTypes from "../actions/actionTypes";

const deleteSection = (state = "", action) => {
  switch (action.type) {
    case actionTypes.DELETE_SECTION:
      return (state = action.data);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
};

export default deleteSection;

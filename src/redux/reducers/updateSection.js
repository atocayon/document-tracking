import actionTypes from "../actions/actionTypes";

const updateSection = (state = "", action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SECTION:
      return (state = action.data);

    default:
      return state;
  }
};

export default updateSection;

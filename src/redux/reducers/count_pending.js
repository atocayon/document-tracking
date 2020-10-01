import actionTypes from "../actions/actionTypes";

const count_pending = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.COUNT_PENDING:
      return (state = action.data);
    default:
      return state;
  }
};

export default count_pending;

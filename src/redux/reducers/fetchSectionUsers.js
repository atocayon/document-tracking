import actionTypes from "../actions/actionTypes";

const defaultState = {
  currentUser: {},
  sectionUsers: [],
};

export default function fetchSectionUsers(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CURRENT_USER:
      return Object.assign({}, state, { currentUser: { ...action.data } });
    case actionTypes.FETCH_SECTION_USERS:
      return Object.assign({}, state, { sectionUsers: [...action.data] });
    default:
      return state;
  }
}

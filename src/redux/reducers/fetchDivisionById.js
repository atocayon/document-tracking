import actionTypes from "../actions/actionTypes";

const defaultState = {};

export default function fetchDivisionById(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DIVISION_BY_ID:
      return {
        ...state,
        depid: action.data.depid,
        department: action.data.department,
        depshort: action.data.depshort,
        payrollshort: action.data.payrollshort
      };

    case actionTypes.INPUT_CHANGE:
      return Object.assign({}, state, {
        [action.text.name]: action.text.value
      });

    default:
      return state;
  }
}

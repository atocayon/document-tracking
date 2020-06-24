import actionTypes from "../actions/actionTypes";
import Reactotron from "reactotron-react-js";
const defaultState = [];
export default function fetchDivisions(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DIVISIONS:
      return [...action.data];
    case actionTypes.ADD_DIVISION:
      return [...state, { ...action._data }];
    case actionTypes.UPDATE_DIVISION:
      return state.map((data, index) => {
        if (data.depid === action.data.depid) {
          return Object.assign({}, data, {
            department: action.data.department,
            depshort: action.data.depshort,
            payrollshort: action.data.payrollshort
          });
        }

        return data;
      });

    case actionTypes.DELETE_DIVISION:
      return state.filter(data => data.depid !== action.data);
    default:
      return state;
  }
}

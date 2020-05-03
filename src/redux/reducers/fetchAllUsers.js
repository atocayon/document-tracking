import actionTypes from "../actions/actionTypes";
import Reactotron from "reactotron-react-js";
const defaultState = [];

export default function fetchAllUsers(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ALL_USER:
      return [...state, ...action.data];
    case actionTypes.POP_USER:
      return state.filter(data => data.user_id !== action.data);
    case actionTypes.ADD_USER:
      return [...state, { ...action._data }];
    case actionTypes.UPDATE_USERS_LIST:
      return state.map((data, index) => {
        if (data.user_id === action._data.user_id) {
          return Object.assign({}, data, {
            employeeId: action._data.employeeId,
            name: action._data.name,
            username: action._data.username,
            contact: action._data.contact,
            email: action._data.email,
            secid: action._data.secid,
            position: action._data.position,
            role_id: action._data.role
          });
        }
        return data;
      });

    default:
      return state;
  }
}

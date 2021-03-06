import actionTypes from "../actions/actionTypes";
import Reatotron from "reactotron-react-js";

const defaultState = {};
export default function fetchUserById(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_BY_ID:
      return {
        ...state,
        user_id: action.data.user_id,
        employeeId: action.data.employeeId,
        name: action.data.name,
        username: action.data.username,
        contact: action.data.contact,
        email: action.data.email,
        secid: action.data.secid,
        secshort: action.data.secshort,
        section: action.data.section,
        position: action.data.position,
        dts_role: action.data.dts_role,
        work_queue_role: action.data.work_queue_role,
        department: action.data.department,
        depshort: action.data.depshort,
      };

    case actionTypes.INPUT_CHANGE:
      return Object.assign({}, state, {
        [action.text.name]: action.text.value,
      });

    default:
      return state;
  }
}

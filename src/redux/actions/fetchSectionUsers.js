import actionTypes from "./actionTypes";
import axios from "axios";

export function fetchSectionUsers(token) {
  return async function (dispatch) {
    let fetchUser = await axios.get("http://10.10.10.16:4000/dts/user/" + token);
    let fetchSectionUsers = await axios
        .get(
            "http://10.10.10.16:4000/dts/sectionUser/" + fetchUser.data.secid.toString()
        );
    let filtered = fetchSectionUsers.data.filter(res => res.user_id !== parseInt(token));
    dispatch({ type: actionTypes.FETCH_CURRENT_USER, data: fetchUser.data });
    dispatch({type: actionTypes.FETCH_SECTION_USERS, data: filtered});
  };
}

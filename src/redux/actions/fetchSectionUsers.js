import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";
export function fetchSectionUsers(token) {
  return async function (dispatch) {
    let fetchUser = await axios.get(server_ip.SERVER_IP_ADDRESS+"user/" + token);
    let fetchSectionUsers = await axios
        .get(
            server_ip.SERVER_IP_ADDRESS+"sectionUser/" + fetchUser.data.secid.toString()
        );
    let filtered = fetchSectionUsers.data.filter(res => res.user_id !== parseInt(token));
    dispatch({ type: actionTypes.FETCH_CURRENT_USER, data: fetchUser.data });
    dispatch({type: actionTypes.FETCH_SECTION_USERS, data: filtered});
  };
}

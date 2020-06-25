import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import server_ip from "../../component/endPoint";
export function onClickTrackShowMore(trans_id, tracking) {
  return function (dispatch) {
    return axios
      .post(server_ip.SERVER_IP_ADDRESS+"fetchSubDocument", {
        trans_id: trans_id.toString(),
        tracking,
      })
      .then((res) => {

        dispatch({
          type: actionTypes.ON_CLICK_SHOW_MORE,
          data: { trans_id, res: res.data },
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}

import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function onClickTrackShowMore(trans_id, tracking) {
  return function (dispatch) {
    return axios
      .post("http://10.10.10.16:4000/dts/fetchSubDocument", {
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

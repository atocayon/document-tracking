import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function receiveDocument(documentTracking, user_id, user_section) {
  Reactotron.log(documentTracking, user_id, user_section);
  return function(dispatch) {
    return axios
      .post("http://localhost:4000/dts/receiveDocument", {
        documentTracking: documentTracking,
        user_id: user_id,
        user_section: user_section
      })
      .then(res => {
        Reactotron.log(res);
        if (res.data.success === "failed") {
          alert("Unknown document tracking number");
        } else {
          dispatch({ type: actionTypes.RECEIVE_DOCUMENT, data: res.data });
          axios
            .get(
              "http://localhost:4000/dts/fetchActionReq/" + res.data.documentId
            )
            .then(action_req => {
              dispatch({
                type: actionTypes.ACTION_REQ,
                data: action_req.data
              });
            })
            .catch(err => {
              throw err;
            });
        }

      })
      .catch(err => {
        alert(err);
      });
  };
}

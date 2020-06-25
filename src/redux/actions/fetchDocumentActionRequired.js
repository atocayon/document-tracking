import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";

export function fetchDocumentActionRequired(doc_id) {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"fetchActionReq/" + doc_id)
      .then((res) => {
        const checkedArr = [];
        const checkbox = {};
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]) {
            checkedArr.push([doc_id, res.data[i].action_req]);
            checkbox[res.data[i].action_req] = true;
          }
        }

        dispatch({
          type: actionTypes.FETCH_DOCUMENT_ACTION_REQUIRED,
          data: { action_req: checkedArr, checkbox },
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}

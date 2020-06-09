import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";

export function fetchPendingDocumentInfo(doc_id) {
  return async function (dispatch) {
    let fetchDocument = await axios.get(
      "http://10.10.10.16:4000/dts/fetchDocument/" + doc_id
    );

    let fetchActionReq = await axios.get(
      "http://10.10.10.16:4000/dts/fetchActionReq/" + doc_id
    );

    let fetchDocumentDestination = await axios.get(
      "http://10.10.10.16:4000/dts/fetchDocumentDestination/" + doc_id
    );

    dispatch({
      type: actionTypes.FETCH_PENDING_DOCUMENT_INFO,
      data: fetchDocument.data,
    });

    dispatch({
      type: actionTypes.FETCH_ACTION_REQUIRED_PENDING_DOCUMENT,
      data: fetchActionReq.data,
    });

    let arr = [];

    for (let i = 0; i < fetchDocumentDestination.data.length; i++) {
      let fetchActionTaken = await axios.post(
        "http://10.10.10.16:4000/dts/fetchActionTaken",
        {
          user_id: fetchDocumentDestination.data[i].receiver_id,
          document_id: fetchDocumentDestination.data[i].document_id,
        }
      );

      let fetchDateTimeRelease = await axios.post(
        "http://10.10.10.16:4000/dts/fetchDateTimeReleased",
        {
          user_id: fetchDocumentDestination.data[i].receiver_id,
          document_id: fetchDocumentDestination.data[i].document_id,
        }
      );

      arr.push({
        office: fetchDocumentDestination.data[i].section,
        date_time_receive: fetchDocumentDestination.data[i].date_time_receive,
        action_taken: fetchActionTaken.data,
        date_time_released: fetchDateTimeRelease.data,
        initial: fetchDocumentDestination.data[i].receiver,
      });
    }

    dispatch({
      type: actionTypes.FETCH_DESTINATION_PENDING_DOCUMENT,
      data: arr,
    });
  };
}

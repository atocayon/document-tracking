import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../server_ip";
import Reactotron from "reactotron-react-js";
export function fetchPendingDocumentInfo(doc_id) {
  return async function (dispatch) {
    let str = doc_id.split("-", 1);
    let fetchDocument = await axios.get(
      server_ip.SERVER_IP_ADDRESS + "fetchDocument/" + str.toString()
    );

    let fetchActionReq = await axios.get(
      server_ip.SERVER_IP_ADDRESS + "fetchActionReq/" + str.toString()
    );

    let fetchDocumentDestination = await axios.get(
      server_ip.SERVER_IP_ADDRESS + "fetchDocumentDestination/" + str.toString()
    );

    let fetchDocumentRouteType = await axios.get(
      server_ip.SERVER_IP_ADDRESS + "fetchDocumentRouteType/" + str.toString()
    );

    Reactotron.log(fetchDocumentRouteType);

    dispatch({
      type: actionTypes.FETCH_DOC_ROUTE_TYPE,
      data: fetchDocumentRouteType.data,
    });
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
        server_ip.SERVER_IP_ADDRESS + "fetchActionTaken",
        {
          user_id: fetchDocumentDestination.data[i].receiver_id,
          document_id: fetchDocumentDestination.data[i].document_id,
        }
      );

      let fetchDateTimeRelease = await axios.post(
        server_ip.SERVER_IP_ADDRESS + "fetchDateTimeReleased",
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

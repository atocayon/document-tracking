import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";

const docBarcode = (doc_id) => {
  const fetchDocumentBarcodes = axios.get(
    "http://" + endPoint.ADDRESS + "/dts/document/barcodes/" + doc_id
  );

  if (fetchDocumentBarcodes.data.length > 1) {
    return fetchDocumentBarcodes.data;
  } else {
    const fetchDocumentBarcode = axios.get(
      "http://" + endPoint.ADDRESS + "/dts/document/barcode/" + doc_id
    );

    return fetchDocumentBarcode.data;
  }
};

const docDestination = (fetchDocDestination) => {
  let arr = [];

  for (let i = 0; i < fetchDocDestination.data.length; i++) {
    const fetchDateTimeReleased = axios.get(
      "http://" +
        endPoint.ADDRESS +
        "/dts/document/sched/" +
        fetchDocDestination.data[i].document_id +
        "/" +
        fetchDocDestination.data[i].receiver_id
    );
    const fetchActionTaken = axios.get(
      "http://" +
        endPoint.ADDRESS +
        "/dts/document/action/" +
        fetchDocDestination.data[i].document_id +
        "/" +
        fetchDocDestination.data[i].receiver_id
    );

    arr.push({
      office: fetchDocDestination.data[i].section,
      date_time_receive: fetchDocDestination.data[i].date_time_receive,
      action_taken: fetchActionTaken.data,
      date_time_released: fetchDateTimeReleased.data,
      initial: fetchDocDestination.data[i].receiver,
    });
  }

  return arr;
};

export function fetchDocumentInfo(doc_id) {
  return async function (dispatch) {
    let str = doc_id.split("-", 1);

    const fetchDocInfo = axios.get(
      "http://" + endPoint.ADDRESS + "/dts/document/" + str
    );
    const fetchDocActionReq = axios.get(
      "http://" + endPoint.ADDRESS + "/dts/document/required/" + str
    );
    const fetchDocDestination = axios.get(
      "http://" + endPoint.ADDRESS + "/dts/document/destination/" + str
    );

    const fetchDocCurrentStatus = axios.get(
      "http://" + endPoint.ADDRESS + "/dts/document/status/" + str
    );

    await dispatch({
      type: actionTypes.FETCH_DOCUMENT_INFO,
      data: fetchDocInfo.data,
    });

    await dispatch({
      type: actionTypes.FETCH_ACTION_REQUIRED_DOCUMENT_INFO,
      data: fetchDocActionReq.data,
    });

    await dispatch({
      type: actionTypes.FETCH_DESTINATION_DOCUMENT_INFO,
      data: docDestination(fetchDocDestination),
    });

    await dispatch({
      type: actionTypes.FETCH_DOCUMENTS_BARCODE,
      data: docBarcode(str),
    });

    await dispatch({
      type: actionTypes.FETCH_DOC_CURRENT_STATUS,
      data: fetchDocCurrentStatus.data,
    });
  };
}

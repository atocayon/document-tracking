import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";

export function fetchDocumentInfo(doc_id) {
  return async function (dispatch) {
    // let str = doc_id.split("-", 1);

    const fetchDocInfo = await axios.get(
      "http://" + process.env.REACT_APP_SERVER + "/dts/document/" + doc_id
    );
    const fetchDocActionReq = await axios.get(
      "http://" +
        process.env.REACT_APP_SERVER +
        "/dts/document/required/" +
        doc_id
    );
    const fetchDocDestination = await axios.get(
      "http://" +
        process.env.REACT_APP_SERVER +
        "/dts/document/destination/" +
        doc_id
    );

    const fetchDocCurrentStatus = await axios.get(
      "http://" +
        process.env.REACT_APP_SERVER +
        "/dts/document/status/" +
        doc_id
    );
    // Reactotron.log("saddsadssda");
    // Reactotron.log(await docDestination(fetchDocDestination));

    await dispatch({
      type: actionTypes.FETCH_DOCUMENT_INFO,
      data: fetchDocInfo.data,
    });

    await dispatch({
      type: actionTypes.FETCH_ACTION_REQUIRED_DOCUMENT_INFO,
      data: fetchDocActionReq.data,
    });

    const _docDestination = await docDestination(fetchDocDestination);
    const _docBarcode = await docBarcode(doc_id);
    await dispatch({
      type: actionTypes.FETCH_DESTINATION_DOCUMENT_INFO,
      data: _docDestination,
    });

    await dispatch({
      type: actionTypes.FETCH_DOCUMENTS_BARCODE,
      data: _docBarcode,
    });

    await dispatch({
      type: actionTypes.FETCH_DOC_CURRENT_STATUS,
      data: fetchDocCurrentStatus.data,
    });
  };
}

const docBarcode = async (doc_id) => {
  const fetchDocumentBarcodes = await axios.get(
    "http://" +
      process.env.REACT_APP_SERVER +
      "/dts/document/barcodes/" +
      doc_id
  );

  if (fetchDocumentBarcodes.data.length > 1) {
    return fetchDocumentBarcodes.data;
  } else {
    const fetchDocumentBarcode = await axios.get(
      "http://" +
        process.env.REACT_APP_SERVER +
        "/dts/document/barcode/" +
        doc_id
    );

    return fetchDocumentBarcode.data;
  }
};

const docDestination = async (fetchDocDestination) => {
  let arr = [];

  for (let i = 0; i < fetchDocDestination.data.length; i++) {
    const fetchDateTimeReleased = await axios.get(
      "http://" +
        process.env.REACT_APP_SERVER +
        "/dts/document/sched/" +
        fetchDocDestination.data[i].document_id
    );
    const fetchActionTaken = await axios.get(
      "http://" +
        process.env.REACT_APP_SERVER +
        "/dts/document/action/" +
        fetchDocDestination.data[i].document_id
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

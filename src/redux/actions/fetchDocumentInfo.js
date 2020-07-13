import actionTypes from "./actionTypes";

export function fetchDocumentInfo(doc_id, socket) {
  return async function (dispatch) {
    let str = doc_id.split("-", 1);

    await socket.emit("fetchDocument", str, async (res) => {
      if (res) {
        if (res !== "server error") {
          await dispatch({
            type: actionTypes.FETCH_DOCUMENT_INFO,
            data: res,
          });
        }
      }
    });

    await socket.emit("fetchActionReq", str, async (res) => {
      if (res) {
        if (res !== "server error") {
          await dispatch({
            type: actionTypes.FETCH_ACTION_REQUIRED_DOCUMENT_INFO,
            data: res,
          });
        }
      }
    });

    await socket.emit(
      "fetchDocumentDestination",
      str,
      async (fetchDocumentDestination) => {
        if (fetchDocumentDestination) {
          if (fetchDocumentDestination !== "server error") {
            let arr = [];
            for (let i = 0; i < fetchDocumentDestination.length; i++) {
              await socket.emit(
                "fetchDateTimeReleased",
                fetchDocumentDestination[i].receiver_id,
                fetchDocumentDestination[i].document_id,
                async (fetchDateTimeRelease) => {
                  if (fetchDateTimeRelease) {
                    if (fetchDateTimeRelease !== "server error") {
                      await socket.emit(
                        "fetchActionTaken",
                        fetchDocumentDestination[i].receiver_id,
                        fetchDocumentDestination[i].document_id,
                        async (fetchActionTaken) => {
                          if (fetchActionTaken) {
                            if (fetchActionTaken !== "server error") {
                              arr.push({
                                office: fetchDocumentDestination[i].section,
                                date_time_receive:
                                  fetchDocumentDestination[i].date_time_receive,
                                action_taken: fetchActionTaken,
                                date_time_released: fetchDateTimeRelease,
                                initial: fetchDocumentDestination[i].receiver,
                              });

                              await dispatch({
                                type:
                                  actionTypes.FETCH_DESTINATION_DOCUMENT_INFO,
                                data: arr,
                              });
                            }
                          }
                        }
                      );
                    }
                  }
                }
              );
            }
          }
        }
      }
    );

    await socket.emit(
      "fetchDocumentBarcodes",
      str,
      async (fetchDocumentBarcodes) => {
        if (fetchDocumentBarcodes) {
          if (fetchDocumentBarcodes !== "server error") {
            if (fetchDocumentBarcodes.length > 1) {
              await dispatch({
                type: actionTypes.FETCH_DOCUMENTS_BARCODES,
                data: fetchDocumentBarcodes,
              });
            } else {
              socket.emit(
                "fetchDocumentBarcode",
                str,
                async (fetchDocumentBarcode) => {
                  if (fetchDocumentBarcode) {
                    if (fetchDocumentBarcode !== "server error") {
                      await dispatch({
                        type: actionTypes.FETCH_DOCUMENTS_BARCODE,
                        data: fetchDocumentBarcode,
                      });
                    }
                  }
                }
              );
            }
          }
        }
      }
    );
  };
}

import actionTypes from "./actionTypes";

export function fetchDocumentActionRequired(doc_id, socket) {
  return async function (dispatch) {
    await socket.emit("fetchActionReq", doc_id, async (res) => {
      if (res) {
        if (res !== "server error") {
          const checkedArr = [];
          const checkbox = {};
          for (let i = 0; i < res.length; i++) {
            if (res.data[i]) {
              checkedArr.push([doc_id, res[i].action_req]);
              checkbox[res[i].action_req] = true;
            }
          }

          await dispatch({
            type: actionTypes.FETCH_DOCUMENT_ACTION_REQUIRED,
            data: { action_req: checkedArr, checkbox },
          });
        }
      }
    });
  };
}

import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function addNewDocCategory(token, category, socket) {
  return async function (dispatch) {
    Reactotron.log(socket);
    await socket.emit("addNewDocumentCategory", token, category, (response) => {
      if (response) {
        if (response === "server error") {
          alert("An error occurred");
        }

        if (response === "inserted") {
          dispatch({
            type: actionTypes.ADD_NEW_DOCUMENT_CATEGORY,
            data: category,
          });
        }
      }
    });
  };
}

export function fetchDocCategory(token, socket) {
  return async function (dispatch) {
    await socket.emit("fetchDocumentCategory", token, (response) => {
      if (response) {
        if (response === "server error") {
          alert("An error occurred");
        }
      }
    });

    await socket.on("sectionDocCategory", (data) => {
      dispatch({
        type: actionTypes.FETCH_SECTION_DOCUMENT_CATEGORY,
        data,
      });
    });
  };
}

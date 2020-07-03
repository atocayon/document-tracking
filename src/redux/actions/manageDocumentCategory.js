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
      let arr = [];
      for (let i = 0 ; i < data.length; i++){
        arr.push({id: data[i].id, type: data[i].category});
      }
      dispatch({type: actionTypes.FETCH_LIST_SECTION_DOC_CATEGORY, data: arr});
    });
  };
}

export function onChangeEditDocCategory({ target }) {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.ONCHANGE_EDIT_DOC_CATEGORY,
      data: { name: target.name, value: target.value },
    });
  };
}

export function saveEditDocCategory(data, token, socket) {
  return async function (dispatch) {
    await socket.emit("updateDocumentCategory", data, token, (err) => {
      if (err) {
        if (err !== "success") {
          throw err;
        } else {
          dispatch({
            type: actionTypes.SAVE_EDIT_DOC_CATEGORY,
            data: "success",
          });
        }
      }
    });
  };
}

export function deleteDocCategory(id, token, socket) {
  return async function (dispatch) {
    await socket.emit("deleteDocCategory", id, token, (err) => {
      if (err) {
        if (err !== "success") {
          throw err;
        } else {
          dispatch({ type: actionTypes.DELETE_DOC_CATEGORY, data: "success" });
        }
      }
    });
  };
}

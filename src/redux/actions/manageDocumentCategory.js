import actionTypes from "./actionTypes";
import axios from "axios";
export function addNewDocCategory(token, category) {
  return async function (dispatch) {
    return axios
      .post(
        "http://" +
          process.env.REACT_APP_SERVER +
          "/dts/user/document/category/new",
        { user_id: token, category }
      )
      .then((res) => {
        dispatch({
          type: actionTypes.ADD_NEW_DOCUMENT_CATEGORY,
          data: "success",
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function fetchDocCategory(token) {
  return async function (dispatch) {
    return axios
      .get(
        "http://" +
          process.env.REACT_APP_SERVER +
          "/dts/user/document/category/" +
          token
      )
      .then(async (res) => {
        await dispatch({
          type: actionTypes.FETCH_SECTION_DOCUMENT_CATEGORY,
          data: res.data,
        });
        let arr = [];
        for (let i = 0; i < res.data.length; i++) {
          arr.push({ id: res.data[i].id, type: res.data[i].category });
        }
        await dispatch({
          type: actionTypes.FETCH_LIST_SECTION_DOC_CATEGORY,
          data: arr,
        });
      })
      .catch((err) => {
        throw err;
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

export function saveEditDocCategory(data, token) {
  return async function (dispatch) {
    return axios
      .post(
        "http://" +
          process.env.REACT_APP_SERVER +
          "/dts/user/document/category/update",
        { data, user_id: token }
      )
      .then((res) => {
        dispatch({
          type: actionTypes.SAVE_EDIT_DOC_CATEGORY,
          data: "success",
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function deleteDocCategory(id) {
  console.log(id);
  return async function (dispatch) {
    return axios
      .post(
        "http://" +
          process.env.REACT_APP_SERVER +
          "/dts/user/document/category/delete",
        { doc_category_id: id }
      )
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_DOC_CATEGORY, data: "success" });
      })
      .catch((err) => {
        throw err;
      });
  };
}

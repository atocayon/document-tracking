import actionTypes from "./actionTypes";

export function handleSearchSectionDocuments({ target }) {
  return async function (dispatch) {
    if (target.value !== "") {
      await dispatch({
        type: actionTypes.HANDLE_SEARCH_SECTION_DOCUMENT,
        data: target.value,
      });
    } else {
      window.location.reload(true);
    }
  };
}

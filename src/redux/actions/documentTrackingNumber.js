import actionTypes from "./actionTypes";

export function documentTrackingNumber({ target }) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.ONCHANGE_DOCUMENT_TRACKING_NUMBER,
      text: { name: target.name, value: target.value },
    });

  };
}

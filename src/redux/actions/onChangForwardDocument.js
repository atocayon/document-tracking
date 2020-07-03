import actionTypes from "./actionTypes";

export function onChangeForwardDocument({ target }) {
  return function(dispatch) {
    return dispatch({
      type: actionTypes.DOCUMENT_REMARKS,
      data: { name: target.name, value: target.value }
    });
  };
}

export function changeDocumentDestination(){
  return function(dispatch){
    return dispatch({type: actionTypes.CHANGE_DOCUMENT_DESTINATION});
  }
}

export function addForwardDestination(data){
  return function(dispatch){
    return dispatch({type: actionTypes.ADD_FORWARD_DESTINATION, data});
  }
}
export function removeForwardDestination(index){
  return function(dispatch){
    return dispatch({type: actionTypes.REMOVE_FORWARD_DESTINATION, index});
  }
}

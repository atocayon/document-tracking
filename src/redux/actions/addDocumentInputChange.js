import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
export function addDocumentInputChange(_val,e) {
    return function(dispatch) {
        Reactotron.log(e.target);
        if (e.target.type === "checkbox"){

            if (e.target.checked){
                Reactotron.log("true");
                Reactotron.log(_val);
                dispatch({type: actionTypes.ADD_DOCUMENT_ACTION_REQ, data: _val});
            }else{
                Reactotron.log("false");
                Reactotron.log(_val);
                 dispatch({type: actionTypes.REMOVE_DOCUMENT_ACTION_REQ, data: _val});
            }

        }else{
            return dispatch({
                type: actionTypes.ADD_DOCUMENT_INPUT_CHANGE,
                text: { name: e.target.name, value: e.target.value }
            });
        }

    };
}
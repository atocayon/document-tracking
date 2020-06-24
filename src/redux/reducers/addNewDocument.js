import actionTypes from "../actions/actionTypes";

const defaultState = "";

export default function addNewDocument(state =defaultState, action){
    switch (action.type) {
        case actionTypes.ADD_DOCUMENT:
            return state = action.data;
        case actionTypes.CLEAR_ADD_DOCUMENT_MESSAGE:
            return state = "";
        default:
            return state;
    }
}
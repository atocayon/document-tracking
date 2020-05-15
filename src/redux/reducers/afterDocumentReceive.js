import actionTypes from "../actions/actionTypes";

const defaultState = "";

export default function afterDocumentReceive(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.AFTER_DOCUMENT_RECEIVED:
            return state = action.data;
        default:
            return  state;
    }
}
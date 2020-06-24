import actionTypes from "../actions/actionTypes";

const defaultState = null;

export default function fetchDocumentId(state= defaultState, action){
    switch (action.type) {
        case actionTypes.FETCH_DOCUMENT_ID:
            return state = action.data;
        default:
            return state;
    }
}
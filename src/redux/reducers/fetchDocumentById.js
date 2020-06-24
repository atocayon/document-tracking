import actionTypes from "../actions/actionTypes";

const defaultState = {};

export default function fetchDocumentById(state = defaultState, action){
    switch (action.type) {
        case actionTypes.FETCH_DOCUMENT_BY_ID:
            return {...state, ...action.data}
        default:
            return state;
    }
}
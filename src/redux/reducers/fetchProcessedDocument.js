import actionTypes from "../actions/actionTypes";

export default function fetchProcessedDocument(state = [], action){
    switch (action.type) {
        case actionTypes.FETCH_PROCESSED_DOCUMENT:
            return [...action.data];
        default:
            return state;
    }
}

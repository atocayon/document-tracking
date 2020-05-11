import actionTypes from "../actions/actionTypes";

const defaultState = {
    documentId: "",
    creator: "",
    subject: "",
    doc_type: "",
    note: "",
    date_time_created: "",
    action_req: []
};

export default function receiveDocument(state = defaultState, action){
    switch (action.type) {
        case actionTypes.RECEIVE_DOCUMENT:
            return {...state, ...action.data};
        default:
            return state;

    }
}
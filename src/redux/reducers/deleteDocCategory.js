import actionTypes from "../actions/actionTypes";

export default function deleteDocCategory(state = "", action) {
    switch (action.type) {
        case actionTypes.DELETE_DOC_CATEGORY:
            return state = action.data;
        default:
            return state;
    }
}
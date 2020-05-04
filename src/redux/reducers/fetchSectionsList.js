import actionTypes from "../actions/actionTypes";
const defaultState = [];

export default function fetchSectionsList(state = defaultState, action){
    switch (action.type) {
        case actionTypes.FETCH_SECTIONS_LIST:
            return [...state, ...action.data];
        case actionTypes.ADD_SECTION:
            return [...state, {...action._data}];
        default:
            return state;
    }
}
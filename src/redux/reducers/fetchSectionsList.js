import actionTypes from "../actions/actionTypes";
const defaultState = [];

export default function fetchSectionsList(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SECTIONS_LIST:
      return [...action.data];
    case actionTypes.ADD_SECTION:
      return [...state, { ...action._data }];
    case actionTypes.UPDATE_SECTION:
      return state.map((_section, index) => {
        if (_section.secid === parseInt(action.data.secid)) {
          return Object.assign({}, _section, {
            divid: action.data.divid,
            section: action.data.section,
            secshort: action.data.secshort,
          });
        }

        return _section;
      });

    case actionTypes.DELETE_SECTION:
      return state.filter((data) => data.secid !== action.data);
    default:
      return state;
  }
}

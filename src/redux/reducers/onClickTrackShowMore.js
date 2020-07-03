import actionTypes from "../actions/actionTypes";

const defaultState = [];

export default function onClickTrackShowMore(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.ON_CLICK_SHOW_MORE:
      if (state.length > 0) {
        if (!state.find((data) => data.trans_id === action.data.trans_id)) {
          return [...state, action.data];
        } else {
          let arr = [...state];
          let remove = arr
            .map((item) => {
              return item.res.trans_id;
            })
            .indexOf(action.data.trans_id);

          arr.splice(remove, 1);
          return [...arr];
        }
      } else {
        return [...state, action.data];
      }

    default:
      return state;
  }
}

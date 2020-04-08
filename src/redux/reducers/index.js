import { combineReducers } from "redux";

import update from "./updateUserProfile";
const rootReducer = combineReducers({
  update: update
});

export default rootReducer;

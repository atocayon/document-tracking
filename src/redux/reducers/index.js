import { combineReducers } from "redux";
import update from "./updateUserProfile";
import userRegistration from "./userRegistration";
const rootReducer = combineReducers({
  update: update,
  userRegistration: userRegistration
});

export default rootReducer;

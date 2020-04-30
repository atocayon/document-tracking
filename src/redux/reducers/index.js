import { combineReducers } from "redux";
import update from "./updateUserProfile";
import userRegistration from "./userRegistration";
import fetchUserById from "./fetchUserById";
const rootReducer = combineReducers({
  update: update,
  userRegistration: userRegistration,
  fetchUserById: fetchUserById
});

export default rootReducer;

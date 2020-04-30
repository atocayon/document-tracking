import { combineReducers } from "redux";
import update from "./updateUserProfile";
import userRegistration from "./userRegistration";
import fetchUserById from "./fetchUserById";
import fetchAllUsers from "./fetchAllUsers";
import fetchAllSections from "./fetchAllSections";
import deleteUser from "./deleteUser";
const rootReducer = combineReducers({
  updateUserProfile: update,
  userRegistration: userRegistration,
  fetchUserById: fetchUserById,
  fetchAllUsers: fetchAllUsers,
  fetchAllSections: fetchAllSections,
  deleteUser: deleteUser
});

export default rootReducer;

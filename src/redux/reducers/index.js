import { combineReducers } from "redux";
import update from "./updateUserProfile";
import fetchUserById from "./fetchUserById";
import fetchAllUsers from "./fetchAllUsers";
import fetchAllSections from "./fetchAllSections";
import deleteUser from "./deleteUser";
import logout from "./logout";
import fetchDivisions from "./fetchDivisions";
import fetchDivisionById from "./fetchDivisionById";
import fetchSectionsList from "./fetchSectionsList";
const rootReducer = combineReducers({
  updateUserProfile: update,
  fetchUserById: fetchUserById,
  fetchAllUsers: fetchAllUsers,
  fetchAllSections: fetchAllSections,
  fetchDivisions: fetchDivisions,
  fetchDivisionById: fetchDivisionById,
  fetchSectionsList: fetchSectionsList,
  deleteUser: deleteUser,
  logout: logout,
});

export default rootReducer;

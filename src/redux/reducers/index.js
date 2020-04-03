import {combineReducers} from "redux";
import user from './login';
import token from './verifyToken';
import profile from "./fetchUserProfile";
import sectionUsers from './fetchUsersBySection';
import update from "./updateUserProfile";
const rootReducer = combineReducers({
   user: user,
   profile: profile,
   sectionUsers: sectionUsers,
   token: token,
   update: update
});

export default rootReducer;
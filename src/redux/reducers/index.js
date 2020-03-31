import {combineReducers} from "redux";
import user from './login';
import token from './verifyToken';
import profile from "./fetchUserProfile";
import sectionUsers from './fetchUsersBySection';
const rootReducer = combineReducers({
   user: user,
   profile: profile,
   sectionUsers: sectionUsers,
   token: token,
});

export default rootReducer;
import { combineReducers } from "redux";
import alert from './alert';
import auth from './auth';
import profileall from './profile';
import post from './post';

export default combineReducers({
    alert,auth,profileall,post
});
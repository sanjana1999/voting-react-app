import {combineReducers} from "redux";

import authReducers from "./auth";
import userinfoReducers from "./userinfo";

const allReducers = combineReducers({
    authenticated : authReducers,
    uniqueid : userinfoReducers,
})

export default allReducers;
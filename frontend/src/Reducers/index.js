import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import logIn from "./Login"
import burger from "./Burger"
import adminActive from "./Admin"
import dom from "./Dom"
const rootReducer = combineReducers({
  firebase,
  logIn,
  burger,
  dom,
  adminActive
})
export default rootReducer

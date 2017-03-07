import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import images from "./Images"
import logIn from "./Login"
import burger from "./Burger"
import adminActive from "./Admin"
import footer from "./Footer"
const rootReducer = combineReducers({
  firebase,
  images,
  logIn,
  burger,
  footer,
  adminActive
})
export default rootReducer

export default function logIn(state = {
  loggedIn: false,
  logInFailed: false,
  logOutFailed: false
}, action) {
    if (action.type === "LOGGED_IN") {
      return {
        ...state,
        loggedIn: action.payload
      }
    } else if(action.type === "NOT_LOGGED_IN") {
     return {
      ...state,
      loggedIn: false
     }
    } else if(action.type === "LOG_IN_FAILED" ) {
     return {
      ...state
     }
    } else if(action.type === "LOG_OUT_FAILED" ) {
     return {
      ...state
     }
    }
    return state;
}

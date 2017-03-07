//////////////////////////////////////////
// ADMIN BURGER
//////////////////////////////////////////
export function adminActive(state) {
  return function(dispatch) {
    if(state) {
      dispatch({type: "ADMIN_ACTIVE", payload: true})
    } else {
      dispatch({type: "ADMIN_NOT_ACTIVE", payload: false})
    }
  }
}

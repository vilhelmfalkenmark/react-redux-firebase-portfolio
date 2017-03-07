//////////////////////////////////////////
// ADMIN BURGER
//////////////////////////////////////////
export function adminBurger(burgerState) {
  return function(dispatch) {
    if(burgerState) {
      dispatch({type: "CLOSE_ADMIN_BURGER", payload: false})
    } else {
      dispatch({type: "OPEN_ADMIN_BURGER", payload: true})
    }
  }
}
/////////////////////////////////////////////
// PORTFOLIO BURGER
/////////////////////////////////////////////
export function portfolioBurger(burgerState) {
  return function(dispatch) {
    if(burgerState) {
      dispatch({type: "CLOSE_PORTFOLIO_BURGER", payload: burgerState})
    } else {
      dispatch({type: "OPEN_PORTFOLIO_BURGER", payload: burgerState})
    }
  }
}

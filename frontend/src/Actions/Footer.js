//////////////////////////////////////////
// Är vi på landningssidan?
//////////////////////////////////////////
export function footer(wakkawakka) {
  return function(dispatch) {
    if(wakkawakka) {
      dispatch({type: "IS_LANDING_PAGE", payload: true})
    } else {
      dispatch({type: "NOT_LANDING_PAGE", payload: false})
    }
  }
}

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
//////////////////////////////////////////
// Ska sidan vara fixerad,
// exempelvis om modal är öppen
//////////////////////////////////////////
export function siteFixed(bror) {
  return function(dispatch) {
    if(bror) {
      dispatch({type: "FIX_PAGE", payload: true})
    } else {
      dispatch({type: "NOT_FIX_PAGE", payload: false})
    }
  }
}

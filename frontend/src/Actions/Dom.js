//////////////////////////////////////////
// Är vi på landningssidan?
//////////////////////////////////////////
export function footer(wakkawakka) {
  return function(dispatch) {
      dispatch({type: "LANDING_PAGE", payload: wakkawakka})
  }
}
//////////////////////////////////////////
// Ska sidan vara fixerad,
// exempelvis om modal är öppen
//////////////////////////////////////////
export function siteFixed(bror) {
  return function(dispatch) {
      dispatch({type: "FIX_PAGE", payload: bror})
  }
}

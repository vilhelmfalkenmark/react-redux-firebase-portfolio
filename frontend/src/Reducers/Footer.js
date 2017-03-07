export default function footer(state = {
  landingPage: false
}, action) {
    //////////////////////////////////////////
    // Hide portfolio header and footer in
    // adminv view
    //////////////////////////////////////////
    if (action.type === "IS_LANDING_PAGE") {
      return {
        ...state,
        landingPage: true
      }
    } else if(action.type === "NOT_LANDING_PAGE") {
     return {
      ...state,
      landingPage: false
     }
    }
    return state;
}

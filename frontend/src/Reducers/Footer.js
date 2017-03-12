export default function footer(state = {
  landingPage: false,
  siteFixed: false
}, action) {
    //////////////////////////////////////////
    // Vilken färg ska footern ha?
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
    //////////////////////////////////////////
    // Fixera sida
    //////////////////////////////////////////
    else if (action.type === "FIX_PAGE") {
      return {
        ...state,
        siteFixed: true
      }
    } else if(action.type === "NOT_FIX_PAGE") {
     return {
      ...state,
      siteFixed: false
     }
    }
    return state;
}

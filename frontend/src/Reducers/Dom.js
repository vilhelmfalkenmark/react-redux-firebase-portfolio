export default function dom(state = {
  landingPage: false,
  siteFixed: false
}, action) {
    //////////////////////////////////////////
    // Vilken färg ska footern ha?
    //////////////////////////////////////////
    if (action.type === "LANDING_PAGE") {
      return {
        ...state,
        landingPage: action.payload
      }
    }
    //////////////////////////////////////////
    // Fixera sida
    //////////////////////////////////////////
    else if (action.type === "FIX_PAGE") {
      return {
        ...state,
        siteFixed: action.payload
      }
    }
    return state;
}

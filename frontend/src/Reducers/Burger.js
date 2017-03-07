export default function burger(state = {
  adminBurger: false,
  portfolioBurger: false
}, action) {
    //////////////////////////////////////////
    // INITIAL FETCH OF DATA
    //////////////////////////////////////////
    if (action.type === "CLOSE_ADMIN_BURGER") {
      return {
        ...state,
        adminBurger: false
      }
    } else if(action.type === "OPEN_ADMIN_BURGER") {
     return {
      ...state,
      adminBurger: true
     }
    }
    if (action.type === "CLOSE_PORTFOLIO_BURGER") {
      return {
        ...state,
        portfolioBurger: false
      }
    } else if(action.type === "OPEN_PORTFOLIO_BURGER") {
     return {
      ...state,
      portfolioBurger: true
     }
    }
    return state;
}

export default function adminActive(state = {
  adminActive: false
}, action) {
    //////////////////////////////////////////
    // Hide portfolio header and footer in
    // adminv view
    //////////////////////////////////////////
    if (action.type === "ADMIN_ACTIVE") {
      return {
        ...state,
        adminActive: true
      }
    } else if(action.type === "ADMIN_NOT_ACTIVE") {
     return {
      ...state,
      adminActive: false
     }
    }
    return state;
}

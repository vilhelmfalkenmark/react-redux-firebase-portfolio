import Firebase from "firebase"
/////////////////////////////////////////////
// KOLLA OM NÅGON ÄR INLOGGAD PÅ SIDLADDNING
/////////////////////////////////////////////
export function checkLoggedIn() {
  return function(dispatch) {
   Firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
        dispatch({type: "LOGGED_IN", payload: true})
       } else {
        dispatch({type: "NOT_LOGGED_IN", payload: true})
       }
      })
  }
 }
/////////////////////////////////////////////
// LOGGA IN
/////////////////////////////////////////////
export function logIn(user) {
 return function(dispatch) {
  Firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
     var errorCode = error.code;
     var errorMessage = error.message;
     if(errorCode) {
      dispatch({type: "LOG_IN_FAILED", payload: true})
     } else {
      dispatch({type: "LOGGED_IN", payload: true})
     }
   });
 }
 }
/////////////////////////////////////////////
// LOGGA UT
/////////////////////////////////////////////
export function logOut() {
 return function(dispatch) {
  Firebase.auth().signOut().then(function() {
   dispatch({type: "LOGGED_IN", payload: false})
  }, function(error) {
   dispatch({type: "LOG_OUT_FAILED", payload: true})
  });
 }
 }

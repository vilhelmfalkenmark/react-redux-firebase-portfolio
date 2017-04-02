import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './Reducers/'
import { reduxFirebase } from 'react-redux-firebase'
import FirebaseConfig from "./FirebaseConfig";
import Firebase from "firebase"
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

const middleware = process.env.NODE_ENV==="production" ?
                   applyMiddleware(promise(),thunk) : applyMiddleware(promise(), thunk, logger())

// const config = {
//  fileMetadataFactory: (uploadRes) => {
//    // upload response from Firebase's storage upload
//    const { metadata: { name, fullPath, downloadURLs } } = uploadRes
//    // default factory includes name, fullPath, downloadURL
//    return {
//      name,
//      fullPath,
//      downloadURL: downloadURLs[0]
//    }
//  }
// }


Firebase.initializeApp(FirebaseConfig);
  const createStoreWithMiddleware = compose(middleware,
    reduxFirebase(FirebaseConfig, { userProfile: 'users' }),
    // Redux Devtools
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
     ? window.devToolsExtension() : f => f
  )(createStore)

  const store = createStoreWithMiddleware(rootReducer)
  export default store;

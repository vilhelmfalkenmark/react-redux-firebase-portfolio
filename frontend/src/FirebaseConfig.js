var FirebaseConfig = {};
if(location.host.indexOf("localhost") !== -1) {
 // DEV
FirebaseConfig = {
  apiKey: "AIzaSyDIqcF0MqAnm0exrx9zIuSYh2Zr_Bf7aLc",
  authDomain: "portfolio-faf4f.firebaseapp.com",
  databaseURL: "https://portfolio-faf4f.firebaseio.com",
  storageBucket: "gs://portfolio-faf4f.appspot.com/"
 }
} else {
 // PROD
 FirebaseConfig = {
  apiKey: "AIzaSyA4MzKyeacM_8GlGgdRfOXa16OR11buEWE",
  authDomain: "portfolio-prod-9f2cc.firebaseapp.com",
  databaseURL: "https://portfolio-prod-9f2cc.firebaseio.com",
  storageBucket: "gs://portfolio-prod-9f2cc.appspot.com"
 }
}
 export default FirebaseConfig;

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDJMAHwRAPgZBUrDB5ytt_8E7K1SmXcIg",
  authDomain: "getnikahfied.firebaseapp.com",
  databaseURL: "https://getnikahfied.firebaseio.com",
  projectId: "getnikahfied",
  storageBucket: "getnikahfied.appspot.com",
  messagingSenderId: "1068916776953",
  appId: "1:1068916776953:web:f2c2cc2ec1907e9a68a728",
  measurementId: "G-RBYY0YFXL8",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getAccessToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BNxxX5147NF65HNrHbqbUbESOsgEKMgOXIBsZ4N3HK9DC13QxaHuJofnwrRdTSYMAPQIY_D2IlphjcC8hW3frUw",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
// Initialize Firebase

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

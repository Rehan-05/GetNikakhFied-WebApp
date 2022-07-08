// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyBDJMAHwRAPgZBUrDB5ytt_8E7K1SmXcIg",
  authDomain: "getnikahfied.firebaseapp.com",
  databaseURL: "https://getnikahfied.firebaseio.com",
  projectId: "getnikahfied",
  storageBucket: "getnikahfied.appspot.com",
  messagingSenderId: "1068916776953",
  appId: "1:1068916776953:web:f2c2cc2ec1907e9a68a728",
  measurementId: "G-RBYY0YFXL8",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// import { initializeApp, getApps } from 'firebase/app';
// import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyCwiEyAT0pfR_xpOdRI7xMKLe3AJ_BtpuI",
//   authDomain: "chat-b31f7.firebaseapp.com",
//   projectId: "chat-b31f7",
//   storageBucket: "chat-b31f7.appspot.com",
//   messagingSenderId: "527857826311",
//   appId: "1:527857826311:web:33715e27ca2dddda8508a2",
//   measurementId: "G-73YN2YK0HC"
// };

// // Initialize Firebase
// if (getApps().length === 0) {
//   initializeApp(firebaseConfig);
// }

// const app = getApps()[0];

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

// const firestore = getFirestore(app);
// const storage = getStorage(app);

// export { auth, firestore, storage };


// import { initializeApp, getApps, getApp } from 'firebase/app';
// import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyCwiEyAT0pfR_xpOdRI7xMKLe3AJ_BtpuI",
//   authDomain: "chat-b31f7.firebaseapp.com",
//   projectId: "chat-b31f7",
//   storageBucket: "chat-b31f7.appspot.com",
//   messagingSenderId: "527857826311",
//   appId: "1:527857826311:web:33715e27ca2dddda8508a2",
//   measurementId: "G-73YN2YK0HC"
// };

// let app;
// let auth;
// let firestore;

// if (getApps().length === 0) {
//   app = initializeApp(firebaseConfig);
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
//   });
//   firestore = getFirestore(app);
// } else {
//   app = getApp();
//   auth = getAuth(app);
//   firestore = getFirestore(app);
// }

// const storage = getStorage(app);

// export { auth, firestore, storage };






// src/services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCwiEyAT0pfR_xpOdRI7xMKLe3AJ_BtpuI",
  authDomain: "chat-b31f7.firebaseapp.com",
  projectId: "chat-b31f7",
  storageBucket: "chat-b31f7.appspot.com",
  messagingSenderId: "527857826311",
  appId: "1:527857826311:web:33715e27ca2dddda8508a2",
  measurementId: "G-73YN2YK0HC"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };







// // App.js
// import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './src/navigation/AppNavigator';
// import { LogBox } from 'react-native';
// import { registerRootComponent } from 'expo';
// import { firebase } from './src/services/firebaseConfig'; 

// LogBox.ignoreLogs(['Setting a timer']);

// const App = () => {
//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// };

// export default App;
// registerRootComponent(App);


import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { Alert, LogBox, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { requestPermission, onMessageListener } from './src/services/pushNotifications';
import * as Notifications from 'expo-notifications';

LogBox.ignoreLogs(['Setting a timer']);

const App = () => {
  useEffect(() => {
    // Meminta izin untuk notifikasi
    requestPermission()
      .then(token => {
        if (token) {
          console.log('FCM Token:', token);
        }
      })
      .catch(err => {
        console.error('Failed to get FCM token:', err);
      });

    // Mendengarkan pesan yang masuk
    const unsubscribe = onMessageListener()
      .then(payload => {
        console.log('Notification received:', payload);
        Alert.alert('New Notification', JSON.stringify(payload));
      })
      .catch(err => console.error('Failed to listen for notifications:', err));

    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;


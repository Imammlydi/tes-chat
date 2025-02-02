import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Alert, Platform } from 'react-native';
import Constants from 'expo-constants';

export const requestPermission = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('FCM Token:', token);
    return token;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};

export const onMessageListener = () => 
  new Promise((resolve, reject) => {
    Notifications.addNotificationReceivedListener(notification => {
      resolve(notification);
    });

    Notifications.addNotificationResponseReceivedListener(response => {
      resolve(response);
    });

    Notifications.addNotificationResponseReceivedListener(err => {
      reject(err);
    });
  });

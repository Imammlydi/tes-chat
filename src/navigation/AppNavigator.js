// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import ContactScreen from '../components/ContactScreen';
import ChatScreen from '../components/ChatScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Contacts" component={ContactScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;


// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import ContactScreen from '../components/ContactScreen';
// import ChatScreen from '../components/ChatScreen';
// import ChatHistoryScreen from '../components/ChatHistoryScreen'; // Create this file if it doesn't exist

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const ChatStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="ContactsScreen" component={ContactScreen} />
//     <Stack.Screen name="ChatScreen" component={ChatScreen} />
//   </Stack.Navigator>
// );

// const AppNavigator = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="ChatStack" component={ChatStack} />
//       <Tab.Screen name="ChatHistoryScreen" component={ChatHistoryScreen} />
//     </Tab.Navigator>
//   );
// };

// export default AppNavigator;



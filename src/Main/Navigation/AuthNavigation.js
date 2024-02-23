import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../Shared/Screens/HomeScreen/HomeScreen';
import ProfileScreen from '../../Shared/Screens/ProfileScreen/ProfileScreen';
const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="home">
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

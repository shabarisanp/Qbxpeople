import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../../Shared/Screens/SignIn/SignInScreen';
import ForgotPassword from '../../Shared/Screens/ForgotPassword/ForgotPassword';
import Onboarding from '../../components/onboarding/Onboarding';
import {AuthContext} from '../../Shared/Authentication/Authcontext';
import NewPassword from '../../Shared/Screens/NewPassword/NewPassword';

const Stack = createStackNavigator();

const Navigationstack = () => {
  const {isAppIntro} = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'onBoarding'}>
       <Stack.Screen name="onBoarding" component={Onboarding} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
};

export default Navigationstack;

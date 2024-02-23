import React, {useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import Navigationstack from './Navigation/Navigationstack';
import {AuthContext} from '../Shared/Authentication/Authcontext';
import AuthNavigation from './Navigation/AuthNavigation';

const MainApp = props => {
  const {userInfo, authLoading} = useContext(AuthContext);
  console.log(userInfo === '');
  return authLoading ? (
    <ActivityIndicator />
  ) : userInfo === null ? (
    <>
      <Navigationstack />
    </>
  ) : (
    <>
      <AuthNavigation />
    </>
  );
};

export default MainApp;

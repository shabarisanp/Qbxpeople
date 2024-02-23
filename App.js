import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {AuthProvider} from './src/Shared/Authentication/Authcontext';
import MainApp from './src/Main/MainApp';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import store from './src/Shared/redux/Store';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AuthProvider>
            <SafeAreaView style={styles.container}>
              <MainApp />
            </SafeAreaView>
          </AuthProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
console.disableYellowBox = true;

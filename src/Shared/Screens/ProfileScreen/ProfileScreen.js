import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TabViewExample from '../../Components/TabBar';
import PersonalDetails from './PersonalDetails';

const ProfileScreen = () => {
  const navigationState = {
    index: 0, // Initial index
    routes: [
      {key: 'personal', title: 'Personal'},
      {key: 'team', title: 'Team'},
      {key: 'payslip', title: 'Payslip'},
      {key: 'leaveTracker', title: 'Leave Tracker'},
      {key: 'timeTracker', title: 'Time Tracker'},
    ],
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'personal':
        return <PersonalDetails />;
      case 'team':
        return (
          <View>
            <Text>Team Content</Text>
          </View>
        );
      // Add cases for other routes as needed
      default:
        return null;
    }
  };

  return (
    <>
      <View style={styles.container} />

      <TabViewExample
        navigationState={navigationState}
        renderScene={renderScene}
      />
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
});

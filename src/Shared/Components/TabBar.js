import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {Colors, Fonts} from '../../Dependent/Constants/Constants';
import {moderateScale} from '../../Dependent/Constants/metrics';
const TabViewExample = ({navigationState, renderScene, tabBarProps}) => {
  const [index, setIndex] = useState(0);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      scrollEnabled={true}
      renderLabel={({route, focused}) => (
        <Text style={[styles.label, focused ? styles.activeLabel : null]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{index, routes: navigationState.routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      {...tabBarProps}
    />
  );
};

const styles = StyleSheet.create({
  routeContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  indicator: {
    backgroundColor: Colors.indicatorColor,
  },
  tabBar: {
    backgroundColor: Colors.white,
  },
  label: {
    color: Colors.secondary, // Default color for labels
    fontFamily: Fonts.bold,
    fontSize: moderateScale(13),
  },
  activeLabel: {
    color: Colors.dark, // Color for active label
    fontFamily: Fonts.bold,
    fontSize: moderateScale(13),
  },
});

export default TabViewExample;

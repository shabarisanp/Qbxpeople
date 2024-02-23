import React, {useRef, useState, useContext} from 'react';
import {View, StyleSheet, FlatList, Animated, StatusBar} from 'react-native';
import slides from '../../Shared/utils/slides';
import OnboardingItem from './OnboardingItem';
import NextButton from './NextButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../Shared/Authentication/Authcontext';
const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const navigation = useNavigation();
  const {setAppIntro} = useContext(AuthContext);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      console.log('navigate to (0) screen');

      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      console.log('navigate to login screen');
      AsyncStorage.setItem('AppIntro', 'true');
      setAppIntro(true);
      navigation.navigate('SignInScreen');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <View style={styles.flatListContainer}>
        <FlatList
          data={slides}
          renderItem={({item}) => <OnboardingItem item={item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={styles.nextButtonContainer}>
        <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / slides.length)}
        />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatListContainer: {
    flex: 0.7,
  },
  nextButtonContainer: {
    flex: 0.3,
  },
});

import React from 'react';
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {Colors, Fonts} from '../../Dependent/Constants/Constants';
import {moderateScale, verticalScale} from '../../Dependent/Constants/metrics';

const OnboardingItem = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image source={item.image} style={{width: width, height: '100%'}} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.titleL1}</Text>
        <Text style={styles.title}>{item.titleL2}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    left: moderateScale(20),
    bottom: moderateScale(30),
    paddingRight: moderateScale(30),
  },
  title: {
    fontSize: moderateScale(64),
    color: Colors.white,
    lineHeight: verticalScale(70),
    fontFamily: Fonts.bold,
  },
  description: {
    fontSize: moderateScale(20),
    color: Colors.white,
    marginTop: moderateScale(20),
    fontFamily: Fonts.semi_bold,
  },
});

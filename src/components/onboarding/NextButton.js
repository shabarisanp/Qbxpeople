import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import {Colors, Fonts} from '../../Dependent/Constants/Constants';
import { moderateScale } from '../../Dependent/Constants/metrics';

const NextButton = ({percentage, scrollTo}) => {
  const size = moderateScale(70);
  const strokeWidth = moderateScale(10);
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  //for animation
  const animation = toValue => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      value => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;
        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage],
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke= {Colors.light_grey}
            fill= {Colors.white}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke= {Colors.linear_color_2}
            fill= {Colors.linear_color_2}
            fillOpacity={0}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            // strokeDashoffset={ circumference - (circumference * percentage) / 100}
            ref={progressRef}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}>
        <Text style={styles.buttonArrow}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    padding: 10,
  },
  buttonArrow: {
    color: Colors.primary_color,
    fontSize: moderateScale(30),
    fontFamily: Fonts.bold,
  },
});

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Slider = props => {
  const {status} = props;
  const [sliderValue, setSliderValue] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(status === 'checked-in' ? true : false);
    setSliderValue(0); // Reset slider value when status changes
  }, [status]);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (sliderValue < 8 * 60 * 60) {
          // 8 hours in seconds
          setSliderValue(prevValue => prevValue + 1);
        } else {
          clearInterval(interval);
        }
      }, 1000); // 1 second interval
    }

    return () => clearInterval(interval);
  }, [isActive, sliderValue]);

  return (
    <View style={{marginTop: 30}}>
      <View style={styles.sliderContainer}>
        <LinearGradient
          colors={['#007D23', '#35EFDA']}
          style={[
            StyleSheet.absoluteFill,
            styles.sliderProgress,
            {width: `${(sliderValue / (8 * 60 * 60)) * 100}%`}, // 8 hours in seconds
          ]}
        />
      </View>
      <Animated.Text
        style={[
          styles.slider,
          {left: `${(sliderValue / (8 * 60 * 60)) * 70}%`},
        ]}>
        🙂
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007D23',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  sliderContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  sliderProgress: {
    borderRadius: 20,
  },
  slider: {
    position: 'absolute',
    fontSize: 20,
    color: 'blue',
    zIndex: 1,
    marginTop: -10,
  },
});

export default Slider;

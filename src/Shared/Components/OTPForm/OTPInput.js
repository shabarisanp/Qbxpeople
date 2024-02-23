import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const OTPInput = ({length = 6, onComplete}) => {
  const [otp, setOTP] = useState(Array(length).fill(''));
  const otpInputs = Array(length).fill(0);
  const refs = useRef(otpInputs.map(() => React.createRef()));

  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      onComplete(otp.join(''));
    }
  }, [otp, onComplete]);

  const handleChange = (index, value) => {
    if (isNaN(value)) {
      return;
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Automatically focus next input
    if (index < length - 1 && value !== '' && refs.current[index + 1]) {
      refs.current[index + 1].current.focus();
    }
  };

  const handleBackspace = (index, value) => {
    if (value === '' && index > 0 && refs.current[index - 1]) {
      const newOTP = [...otp];
      newOTP[index - 1] = '';
      setOTP(newOTP);
      refs.current[index - 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input}
          ref={refs.current[index]}
          onChangeText={value => handleChange(index, value)}
          onKeyPress={({nativeEvent}) =>
            nativeEvent.key === 'Backspace' && handleBackspace(index, digit)
          }
          keyboardType="numeric"
          maxLength={1}
          value={digit}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50, // Make it round
    fontSize: 24,
    textAlign: 'center',
    width: 50,
    height: 50,
    margin: 5,
  },
});

export default OTPInput;

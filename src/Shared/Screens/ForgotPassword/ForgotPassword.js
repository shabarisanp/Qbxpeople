import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Dependent/Constants/metrics';
import {Colors, Fonts, Images} from '../../../Dependent/Constants/Constants';
import CustomButton from '../../Components/Button';
import CustomTextInput from '../../Components/TextInput';
import OTPInput from '../../Components/OTPForm/OTPInput';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState(null);
  const [errorMessage, setErrorMessages] = useState(null);
  const [OtpScreen, setOtpScreen] = useState(false);
  const [otpValue, setOTPValue] = useState('');
  const navigation = useNavigation();

  const handleOTPComplete = otp => {
    setOTPValue(otp);
  };
  const maximumCodeLength = 4;

  const handleInputChange = inputText => {
    setEmail(inputText);
  };
  const SendOTP = () => {
    if (!OtpScreen) {
      let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (email !== null) {
        const emailValidation = pattern.test(email);
        if (emailValidation === true) {
          setErrorMessages(null);
          setEmail('');
          setOtpScreen(true);
        } else {
          setErrorMessages('Invalid Email Formate');
        }
      } else {
        setErrorMessages('Email field is not empty');
      }
    } else {
      if (otpValue === '') {
        setErrorMessages('OTP field is not empty');
      } else if (otpValue.length > 4) {
        setErrorMessages('OTP values is invalid');
      } else {
        console.log(otpValue);
        setErrorMessages('');
        navigation.navigate('NewPassword');
      }
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="angle-left"
            size={moderateScale(24)}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.forgotPasswordInputContainer}>
        <Image source={Images.logo} style={styles.logoImg} />
        <Text style={styles.welcomeText}>
          {OtpScreen ? 'OTP Verification' : 'Forgot Password'}
        </Text>
        {!OtpScreen ? (
          <View style={styles.inputSection}>
            <CustomTextInput
              inputContainer={
                errorMessage !== null
                  ? [styles.inputContainer, {borderColor: Colors.danger}]
                  : styles.inputContainer
              }
              placeHolder={'Your e-mail'}
              icon={'envelope-o'}
              onChangeText={e => handleInputChange(e)}
              textValues={email}
              placeholderTextColor={
                errorMessage === null ? Colors.textInput_color : Colors.danger
              }
              iconStyle={
                errorMessage === null ? styles.iconStyle : styles.dangerColor
              }
            />
            {errorMessage && (
              <Text style={styles.errorMessages}>{errorMessage}</Text>
            )}
            <Text style={styles.backToSignin}>Back to sign in</Text>
          </View>
        ) : (
          <View style={styles.inputSection}>
            <Pressable onPress={() => Keyboard.dismiss}>
              <OTPInput
                length={maximumCodeLength}
                onComplete={handleOTPComplete}
              />
            </Pressable>
            {errorMessage && (
              <Text style={styles.errorMessages}>{errorMessage}</Text>
            )}
            <View style={styles.textContainer}>
              <Text style={[styles.textStyle, styles.resendText]}>
                If you didn’t receive a code.{' '}
              </Text>
              <TouchableOpacity style={[styles.textStyle]}>
                <Text
                  style={[
                    styles.link,
                    styles.resendText,
                    styles.underline,
                    styles.dangerColor,
                  ]}>
                  Resend
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <CustomButton
          linearColors={[Colors.linear_color_1, Colors.linear_color_2]}
          textColor="white"
          title={!OtpScreen ? 'Send' : 'Verify'}
          iconSize={20}
          textStyle={styles.buttonText}
          buttonStyle={styles.customButton}
          onPress={() => SendOTP()}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Have trouble </Text>
          <TouchableOpacity style={styles.alignCenter}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
  },
  backIcon: {
    width: moderateScale(48), // Set a fixed width for the TouchableOpacity
    height: moderateScale(48), // Set a fixed height for the TouchableOpacity
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    borderRadius: moderateScale(24), // Half of the height to make it a circle
    borderColor: Colors.textInput_color,
    borderWidth: 1,
  },
  forgotPasswordInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(30),
  },
  logoImg: {
    width: verticalScale(100),
    height: verticalScale(100),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: horizontalScale(60),
  },
  welcomeText: {
    color: Colors.primary_color,
    fontFamily: Fonts.bold,
    fontSize: moderateScale(24),
    marginTop: horizontalScale(10),
  },
  customButton: {
    width: verticalScale(192),
    height: horizontalScale(50),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.semi_bold,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: Colors.primary_color,
    alignSelf: 'flex-end',
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignSelf: {
    alignItems: 'flex-start',
  },
  textStyle: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.bold,
    paddingVertical: 10,
    color: Colors.secondary,
  },
  inputContainer: {
    borderRadius: 50,
    borderColor: Colors.secondary,
    borderWidth: 1,
    width: 300,
  },
  alignSelfCenter: {alignSelf: 'center'},
  iconStyle: {
    color: Colors.textInput_color,
  },
  inputSection: {
    marginVertical: verticalScale(20),
  },
  dangerColor: {
    color: Colors.danger,
  },
  errorMessages: {
    color: Colors.danger,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(13),
  },
  backToSignin: {
    fontFamily: Fonts.semi_bold,
    color: Colors.textInput_color,
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  resendText: {
    fontFamily: Fonts.semi_bold,
    color: Colors.textInput_color,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default ForgotPassword;

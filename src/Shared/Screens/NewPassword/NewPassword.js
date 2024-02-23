import React, {useState, useContext} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Authentication/Authcontext';

const NewPassword = () => {
  const {login} = useContext(AuthContext);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errorMessagePassword, setErrorMessagePassword] = useState(null);
  const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] =
    useState(null);
  const navigation = useNavigation();
  const submitPassword = () => {
    if (confirmPassword === null && password === null) {
      setErrorMessagePassword('Password Field is required');
      setErrorMessageConfirmPassword('Confirm Password is required');
    } else if (confirmPassword === null) {
      setErrorMessageConfirmPassword('Confirm Password is required');
      setErrorMessagePassword(null);
    } else if (password === null) {
      setErrorMessagePassword('Password is required');
      setErrorMessageConfirmPassword(null);
    } else if (password.length < 8) {
      setErrorMessagePassword('Password required 8 characters');
      setErrorMessageConfirmPassword(null);
    } else if (password !== confirmPassword) {
      setErrorMessageConfirmPassword('Confirm Password is not match');
      setErrorMessagePassword(null);
    } else {
      console.log(password, confirmPassword);
      setErrorMessagePassword(null);
      setErrorMessageConfirmPassword(null);
      if (password) {
        login(password);
      }
    }
  };
  const handleInputChange = (inputText, type) => {
    if (type === 'password') {
      setPassword(inputText);
    } else {
      setConfirmPassword(inputText);
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => {
            /* handle onPress event */
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
        <Text style={styles.welcomeText}>{'New Password'}</Text>
        <View style={styles.inputSection}>
          <CustomTextInput
            inputContainer={
              errorMessagePassword !== null
                ? [styles.inputContainer, {borderColor: Colors.danger}]
                : styles.inputContainer
            }
            placeHolder={'At least 8 digits'}
            onChangeText={e => handleInputChange(e, 'password')}
            textValues={password}
            placeholderTextColor={
              errorMessagePassword === null
                ? Colors.textInput_color
                : Colors.danger
            }
            label="Enter New Password"
            labelStyle={styles.labelStyle}
            secureTextEntry={true}
          />
          {errorMessagePassword && (
            <Text style={styles.errorMessages}>{errorMessagePassword}</Text>
          )}
          <CustomTextInput
            inputContainer={
              errorMessageConfirmPassword !== null
                ? [styles.inputContainer, {borderColor: Colors.danger}]
                : styles.inputContainer
            }
            placeHolder={'***********'}
            onChangeText={e => handleInputChange(e, 'confirmpassword')}
            textValues={confirmPassword}
            placeholderTextColor={
              errorMessageConfirmPassword === null
                ? Colors.textInput_color
                : Colors.danger
            }
            label="Confirm Password"
            labelStyle={styles.labelStyle}
            secureTextEntry={true}
          />
          {errorMessageConfirmPassword && (
            <Text style={styles.errorMessages}>
              {errorMessageConfirmPassword}
            </Text>
          )}
        </View>

        <CustomButton
          linearColors={[Colors.linear_color_1, Colors.linear_color_2]}
          textColor="white"
          title={'Sign In'}
          iconSize={20}
          textStyle={styles.buttonText}
          buttonStyle={styles.customButton}
          onPress={() => submitPassword()}
        />
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
    fontSize: 18,
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
  labelStyle: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.semi_bold,
    color: Colors.dark_light,
  },
});

export default NewPassword;

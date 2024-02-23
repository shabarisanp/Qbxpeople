import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../Components/Button';
import {Colors, Fonts, Images} from '../../../Dependent/Constants/Constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Dependent/Constants/metrics';
import CustomTextInput from '../../Components/TextInput';
import CenterModal from '../../Components/CenterModal';
import {AuthContext} from '../../Authentication/Authcontext';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/Slices/authSlices';
const SignInScreen = () => {
  const [isEmailScreen, setIsEmailScreen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPasswordScreen, setPasswordScreen] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessages] = useState(null);
  const {login} = useContext(AuthContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {mutate, isLoading, isError, error} = useMutation(login, {
    onSuccess: data => {
      console.log(data);
      // dispatch(setUser(data.user));
    },
  });

  useEffect(() => {
    let timeout;
    if (modalVisible) {
      timeout = setTimeout(() => {
        setModalVisible(false);
        setPasswordScreen(true);
      }, 10000); // 10 seconds
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [modalVisible]);
  const handleInputChange = inputText => {
    if (!isPasswordScreen) {
      setEmail(inputText);
    } else {
      setPassword(inputText);
    }
  };

  const SignInForm = () => {
    setIsEmailScreen(true);
  };
  const SendOTP = () => {
    if (!isPasswordScreen) {
      let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (email !== null) {
        const emailValidation = pattern.test(email);
        if (emailValidation === true) {
          setErrorMessages(null);
          mutate(email);
          // setEmail('');
          // setModalVisible(!modalVisible);
        } else {
          setErrorMessages('Invalid Email Formate');
        }
      } else {
        setErrorMessages('Email field is not empty');
      }
    } else {
      if (password !== null && password !== '') {
       // console.log(password);
        setErrorMessages(null);
      } else {
        setErrorMessages('password field is not empty');
      }
    }
    if (password) {
      login(password);
    }
  };
 // console.log(email);
  return (
    <ImageBackground source={Images.Screen_bg} style={styles.imageBackground}>
      {!isEmailScreen ? (
        <View style={styles.container}>
          <Image source={Images.login_image} style={styles.img} />
          <CustomButton
            linearColors={[Colors.linear_color_1, Colors.linear_color_2]}
            textColor="white"
            title="Sign In"
            iconSize={20}
            textStyle={styles.buttonText}
            buttonStyle={styles.customButton}
            onPress={() => SignInForm()}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Have trouble </Text>
            <TouchableOpacity style={styles.alignCenter}>
              <Text style={styles.link}>Signing in?</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={[styles.container, styles.alignSelf]}>
          <Text style={styles.welcomeText}>Welcome !</Text>
          <Text style={styles.QbrainerText}>Qbrainers</Text>
          <View style={styles.centerScreen}>
            <Image source={Images.logo} style={styles.logoImg} />
            <View style={styles.inputSection}>
              <CustomTextInput
                inputContainer={
                  errorMessage !== null
                    ? [styles.inputContainer, {borderColor: Colors.danger}]
                    : styles.inputContainer
                }
                placeHolder={
                  isPasswordScreen ? 'Enter your password' : 'Your e-mail'
                }
                icon={isPasswordScreen ? 'lock' : 'envelope-o'}
                secureTextEntry={isPasswordScreen ? true : false}
                onChangeText={e => handleInputChange(e)}
                textValues={isPasswordScreen ? password : email}
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
            </View>
            <CustomButton
              linearColors={[Colors.linear_color_1, Colors.linear_color_2]}
              textColor="white"
              title={isPasswordScreen ? 'Sign In' : 'Generate'}
              iconSize={20}
              textStyle={styles.buttonText}
              buttonStyle={[styles.customButton, styles.alignSelfCenter]}
              onPress={() => {
                SendOTP();
              }}
            />
            {!isPasswordScreen ? (
              <TouchableOpacity
                style={styles.textContainer}
                onPress={() => {
                  navigation.navigate('forgotPassword');
                }}>
                <Text style={styles.textStyle}>Forgot Password ? </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      )}
      <CenterModal visible={modalVisible} onClose={() => SendOTP()} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  img: {
    width: verticalScale(300),
    height: verticalScale(300),
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: verticalScale(20),
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
  textStyle: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.bold,
    paddingVertical: 10,
    color: Colors.secondary,
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
  welcomeText: {
    color: Colors.primary_color,
    fontFamily: Fonts.bold,
    fontSize: moderateScale(32),
  },
  QbrainerText: {
    color: Colors.primary_color,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(32),
  },
  logoImg: {
    width: verticalScale(100),
    height: verticalScale(100),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  centerScreen: {
    flex: 0.5,
    justifyContent: 'center',
    alignSelf: 'center',
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
  errorMessages: {
    color: Colors.danger,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(13),
  },
  inputSection: {
    marginVertical: verticalScale(20),
  },
  dangerColor: {
    color: Colors.danger,
  },
});

export default SignInScreen;

import {Platform} from 'react-native';
export const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
export const passwordPattern = /^.*(?=.{8,})/;
export const Colors = {
  //UI Neutrals
  primary_color: '#FF0000',
  secondary: '#6C6C6C',
  linear_color_1: '#FF4B1F',
  linear_color_2: '#FF9068',
  success: '#12BA37',
  light_red: '#FFA6A6',
  textInput_color: '#919191',
  danger: '#ff0e0e',
  dark_light: '#444444',
  home_bg_1: '#FFF8F8',
  home_bg_2: '#FFFFFF',
  dark: '#000000',
  white: '#ffffff',
  grey: '#E9E9E9',
  light_grey: '#FFF8F8',
  light_white: '#D9D9D9',
  light_purple: '#FFE0E0',
  success_light: '#00BDA9',
  box_border: '#C6C6C6',
  grey_light_semi: '#D6D6D6',
  indicatorColor: '#FF4646',
};

export const Fonts = {
  regular: Platform.OS === 'ios' ? 'Quicksand-Regular' : 'Quicksand-Regular',
  light: Platform.OS === 'ios' ? 'Quicksand-Light' : 'Quicksand-Light',
  medium: Platform.OS === 'ios' ? 'Quicksand-Medium' : 'Quicksand-Medium',
  bold: Platform.OS === 'ios' ? 'Quicksand-Bold' : 'Quicksand-Bold',
  semi_bold:
    Platform.OS === 'ios' ? 'Quicksand-SemiBold' : 'Quicksand-SemiBold',
};

export const Images = {
  Screen_bg: require('../../assets/images/background_image.png'),
  login_image: require('../../assets/images/login_image.png'),
  logo: require('../../assets/images/logo.png'),
  profile: require('../../assets/images/profile.png'),
  birthday: require('../../assets/images/birthday.png'),
  hire: require('../../assets/images/newhire.png'),
};

export const Icons = {
  success_check: require('../../assets/images/Rectangle.png'),
};

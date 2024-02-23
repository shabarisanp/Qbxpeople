import {Platform} from 'react-native';

export const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
export const passwordPattern = /^.*(?=.{8,})/;

export const Colors = {
  //UI Neutrals
  primary_color: '#FF0000',
  white: '#FFFFFF',
  black: '#0a0a0a',
  grey_xlight: '#CBCACA',
  grey_light: '#888888',
  grey_medium: '#4D4C4C',
  grey_dark: '#333333',
  transparent: 'transparent',
  danger: '#ff0e0e',
  yellow: '#faea05',
  secondary: '#6C6C6C',
};

export const Fonts = {
  regular: Platform.OS === 'ios' ? 'Quicksand-regular' : 'Quicksand_regular',
  light: Platform.OS === 'ios' ? 'Quicksand-light' : 'Quicksand_light',
  medium: Platform.OS === 'ios' ? 'poppins-medium' : 'poppins_medium',
  bold: Platform.OS === 'ios' ? 'Quicksand-Bold' : 'Quicksand_bold',
  semi_bold:
    Platform.OS === 'ios' ? 'Quicksand-semibold' : 'Quicksand_semibold',
};

export const Images = {
  //navbarBG1_large: require('../assets/Images/logintopbar_large.png'),
};

export const Icons = {};

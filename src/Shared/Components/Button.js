import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the icon library and icon name as per your requirement

const CustomButton = props => {
  const {
    linearColors,
    title,
    textColor,
    icon,
    iconColor,
    iconSize,
    onPress,
    textStyle,
    buttonStyle,
    ...otherProps
  } = props;

  return (
    <View>
      <TouchableOpacity onPress={onPress} {...otherProps}>
        <LinearGradient
          colors={linearColors || ['#4c669f', '#3b5998', '#192f6a']}
          style={(styles.buttonContainer, buttonStyle)}>
          {icon && (
            <Icon
              name={icon}
              size={iconSize || 20}
              color={iconColor || 'white'}
              style={styles.icon}
            />
          )}
          <Text style={[styles.text, {color: textColor || 'white'}, textStyle]}>
            {title || 'Press Me'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    textAlign: 'center',
  },
});

export default CustomButton;

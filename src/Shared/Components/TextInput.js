import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomTextInput = ({
  label,
  icon,
  iconStyle,
  labelStyle,
  inputStyle,
  secureTextEntry,
  onChangeText,
  inputContainer,
  placeHolder,
  textValues,
  placeholderTextColor,
  iconContainer,
  container,
  ...rest
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container,container]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.inputContainer, inputContainer]}>
        <View style={[styles.iconContainer, iconContainer]}>
          <Icon name={icon} style={[styles.icon, iconStyle]} />
        </View>
        <TextInput
          placeholder={placeHolder}
          style={[styles.input, inputStyle]}
          secureTextEntry={isPasswordVisible}
          onChangeText={onChangeText}
          value={textValues}
          placeholderTextColor={placeholderTextColor}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}>
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-slash'}
              style={[styles.icon, iconStyle]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 20,
    color: '#333',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default CustomTextInput;

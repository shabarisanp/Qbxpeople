import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

const FloatLabelInput = ({label, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);
  const {value, onChangeText, placeholder} = props;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isFocused || value ? '' : 'placeholder'}
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    position: 'absolute',
    left: 5,
    top: -10,
    fontSize: 12,
    color: '#555',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  input: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default FloatLabelInput;

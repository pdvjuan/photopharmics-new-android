import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { EyeIcon, EyeOffIcon } from 'react-native-heroicons/outline'; // Make sure to have these icons from your icons library

const PasswordInputField = ({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  style,
  textContentType,
  keyboardType,
  onSubmitEditing,
  autoCompleteType,
  autoFocus,
  blurOnSubmit,
  onFocus,
}) => {
  const inputRef = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          editable={!disabled}
          onFocus={onFocus}
          onSubmitEditing={onSubmitEditing}
          autoCompleteType={autoCompleteType}
          secureTextEntry={!isPasswordVisible}
          textContentType={textContentType}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          blurOnSubmit={blurOnSubmit}
          ref={inputRef}
          style={[
            styles.input,
            disabled && styles.disabledInput,
            error && styles.errorInput,
          ]}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(prevState => !prevState)}
          style={styles.icon}
        >
          {isPasswordVisible ? (
            <EyeOffIcon color="gray" /> // Use your preferred color or style
          ) : (
            <EyeIcon color="gray" /> // Use your preferred color or style
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
  },
  errorInput: {
    borderColor: '#ff0000',
  },
});

export default PasswordInputField;

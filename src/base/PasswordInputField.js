import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { EyeIcon, EyeOffIcon } from 'react-native-heroicons/outline';
import { tw } from 'tailwind'; 

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
  focus
}) => {
  const inputRef = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (focus) inputRef.current.focus();
  }, [focus])

  return (
    <View style={[tw("py-1"), style]}>
      {label && <Text style={tw("font-nunito-400 text-base text-celeste-darkgray")}>{label}</Text>}
      <View style={[
          tw("flex-row items-center border-2 border-gray-300 rounded"),
          disabled && tw("bg-gray-100"),
          error && tw("border-red-400"),
          styles.inputContainer, 
      ]}>
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
          style={[tw("flex-1 text-xl p-2"), styles.input]} 
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(prevState => !prevState)}
          style={styles.icon}
        >
          {isPasswordVisible ? <EyeOffIcon color="gray" /> : <EyeIcon color="gray" />}
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
  },
  icon: {
    padding: 10,
  },
  label: {
    marginBottom: 5,
  },
});

export default PasswordInputField;
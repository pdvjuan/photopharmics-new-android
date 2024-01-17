import React, { useEffect, useRef } from "react";
import { tw } from "tailwind";
import { View, Text, StyleSheet, TextInput } from "react-native";

const InputField = ({
  value,
  onChange,
  label,
  placeholder,
  autoCapitalize = "none",
  autoCorrect = false,
  disabled = false,
  error = false,
  style,
  password = false,
  textContentType,
  keyboardType,
  onSubmitEditing,
  autoCompleteType,
  autoFocus,
  blurOnSubmit,
  onFocus,
  focus,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (focus) inputRef.current.focus();
  }, [focus]);

  return (
    <View style={[tw("py-1"), style]}>
      <Text style={tw("font-nunito-400 text-base text-celeste-darkgray")}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        editable={!disabled}
        onFocus={onFocus}
        onSubmitEditing={onSubmitEditing}
        autoCompleteType={autoCompleteType}
        style={[
          tw("text-xl p-2 border-2 border-gray-300 rounded"),
          disabled && tw("bg-gray-100"),
          error && tw("border-red-400"),
        ]}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        secureTextEntry={password}
        textContentType={textContentType}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        blurOnSubmit={blurOnSubmit}
        ref={inputRef}
      />
    </View>
  );
};

export default InputField;

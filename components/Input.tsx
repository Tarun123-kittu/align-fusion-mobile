import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from 'react-native';
import { COLORS } from '../constants/Colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({ label, error, icon, style, containerStyle, ...props }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputWrapper, error && styles.inputError]}>
        {icon && <View style={styles.icon}>{icon}</View>}

        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={COLORS.inputPlaceHolder}
          {...props}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textWhite,
    fontFamily: 'PlusJakartaSans',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: COLORS.darkBackground,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 14,
    color: COLORS.textWhite,
  },
  icon: {
    marginRight: 10,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 6,
    fontFamily: 'Inter',
  },
});

export default Input;

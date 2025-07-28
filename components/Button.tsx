import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS } from '../constants/Colors';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ title, onPress, style, disabled  }) => {
  const backgroundColor = disabled ? COLORS.disabled : COLORS.primary;

  return (
    <Pressable
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 60,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.textWhite,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
});

export default Button;

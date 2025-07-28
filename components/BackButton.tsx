// components/BackButton.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../constants/Colors';

const BackButton = () => {
  const router = useRouter();

  return (
    <Pressable style={styles.button} onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={24} color={COLORS.textWhite} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 24,
    left: 24,
    zIndex: 10,
  },
});

export default BackButton;

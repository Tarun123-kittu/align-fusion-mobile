import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../components/Button';
import { COLORS } from '../constants/Colors';

const successIcon = require('../assets/images/password-success.png'); 

const ResetPasswordScreen = () => {

  const handleLoginPress = () => {
    router.push('/LoginScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>

          <Image source={successIcon} style={styles.icon} resizeMode="contain" />

          <View style={{ gap: 12 }}>
            <Text style={styles.title}>Reset Password Success!</Text>
            <Text style={styles.subtitle}>
              Please login to the app again{'\n'}with your new password
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLoginPress} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    // flex: 1,
  },
  iconContainer: {
    backgroundColor: COLORS.primary,
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 92,
    height: 110,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textWhite,
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.inputPlaceHolder,
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  buttonContainer: {
    paddingBottom: 48,
  },
});

export default ResetPasswordScreen;

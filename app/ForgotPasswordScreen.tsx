import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as yup from 'yup';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Input from '../components/Input';
import { COLORS } from '../constants/Colors';

const forgotMail = require('../assets/images/forgot-email.png');

const schema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

type FormData = {
  email: string;
};

const ForgotPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Sending OTP to:', data.email);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoiding}
      >
        <BackButton />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.iconContainer}>
            <Image
              source={forgotMail}
              style={styles.icon}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Forgot Your Password?</Text>
            <Text style={styles.subtitle}>
              Please enter your email address account to send the OTP verification to reset your password
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="franklinclinton@gmail.com"
                  error={errors.email?.message}
                  icon={<Ionicons name="mail-outline" size={20} color={COLORS.inputPlaceHolder} />}
                />
              )}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 100,
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 24,
  },
  iconContainer: {
    backgroundColor: COLORS.primary,
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    alignSelf: 'center',
  },
  titleContainer: {
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textWhite,
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.inputPlaceHolder,
    textAlign: 'center',
    fontFamily: 'Inter',
    marginHorizontal: 12,
    fontWeight: '400',
  },
  inputContainer: {
    marginTop: 24,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
});

export default ForgotPasswordScreen;

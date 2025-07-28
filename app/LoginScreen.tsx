import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import { COLORS } from '../constants/Colors';
import { loginSchema } from '../validation/loginSchema';

const logo = require('../assets/images/app-logo.png');

type FormValues = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('Logging in:', data);
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headContainer}>
          <Image
            source={logo}
            style={styles.logo}
          />
          <Text style={styles.title}>Login to your Account</Text>
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your email"
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your password"
                  error={errors.password?.message}
                />
              )}
            />

            <Text onPress={() => {
              router.push('/ForgotPasswordScreen');
            }} style={styles.forgotText}>Forgot Password?</Text>
          </View>

          <Button title="Log In" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  headContainer: {
    alignItems: 'center',
    marginBottom: 72,
  },
  logo: {
    width: 180,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    fontFamily: 'Inter',
    marginTop: 24,
    textAlign: 'center',
  },
  bodyContainer: {
    gap: 32,
    marginTop: 32,
  },
  formContainer: {
    gap: 16,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
    textAlign: 'right',
  },
});

export default LoginScreen;

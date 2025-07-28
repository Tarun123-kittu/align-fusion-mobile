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
import Button from '../components/Button';
import PasswordInput from '../components/PasswordInput';
import { COLORS } from '../constants/Colors';

const passwordIcon = require('../assets/images/create-mail.png'); // Replace with the actual icon

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

const CreateNewPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Resetting password with:', data);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.iconContainer}>
            <Image source={passwordIcon} style={styles.icon} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Create New Password</Text>
            <Text style={styles.subtitle}>
              Create new strong password for updating{'\n'}
              f***********n@gmail.com
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="New password"
                  error={errors.newPassword?.message}
                  icon={<Ionicons name="lock-closed-outline" size={20} color={COLORS.inputPlaceHolder} />}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Confirm new password"
                  error={errors.confirmPassword?.message}
                  icon={<Ionicons name="lock-closed-outline" size={20} color={COLORS.inputPlaceHolder} />}
                />
              )}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button title="Confirm Reset Password" onPress={handleSubmit(onSubmit)} />
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
    fontWeight: '400',
  },
  inputGroup: {
    gap: 16,
    marginTop: 24,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  textContainer: {
    gap: 8,
  },
});

export default CreateNewPasswordScreen;

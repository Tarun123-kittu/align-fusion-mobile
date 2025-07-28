import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { UserProvider, useUser } from './context/UserContext';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.flex}>
                <ConditionalNavigation />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
        <Toast />
      </UserProvider>
    </QueryClientProvider>
  );
}

function ConditionalNavigation() {
  const { user } = useUser();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        // If signed in, show main app
        <Stack.Screen name="(tabs)" />
      ) : (
        // If not signed in, show auth flow
        <>
          <Stack.Screen name="LoginScreen" />
          <Stack.Screen name="ForgotPasswordScreen" />
          <Stack.Screen name="CreateNewPasswordScreen" />
          <Stack.Screen name="ResetPasswordScreen" />
        </>
      )}
    </Stack>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  flex: {
    flex: 1,
  },
});

import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/profile/edit-profile')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#EAB308',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#111827',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen; 
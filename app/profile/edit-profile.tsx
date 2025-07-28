import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const EditProfileScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Edit Profile</Text>
    <View style={styles.formPlaceholder}>
      <Text style={styles.placeholderText}>[Profile editing form goes here]</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 32,
  },
  formPlaceholder: {
    backgroundColor: '#22223b',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.7,
  },
});

export default EditProfileScreen; 
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const ChallengesScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Challenges Screen</Text>
  </SafeAreaView>
);

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
  },
});

export default ChallengesScreen; 
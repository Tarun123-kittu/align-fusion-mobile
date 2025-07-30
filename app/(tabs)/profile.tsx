import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { COLORS } from '../..//constants/Colors';

const ProfileScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={styles.darkSection}>
        </View>

        <View style={styles.lightSection}>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
    paddingBottom: 80,
  },
  scrollView: {
    flex: 1,
  },

  // White Section Styles
  lightSection: {
    backgroundColor: COLORS.lightBackground,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    // marginTop: -10,
    paddingTop: 24,
    paddingHorizontal: 20,
    minHeight: 650,
  },
  darkSection: {
    backgroundColor: COLORS.darkBackground,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default ProfileScreen; 
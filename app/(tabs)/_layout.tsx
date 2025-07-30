import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/Colors';

const homeActive = require('../../assets/images/home-active.png');
const homeInactive = require('../../assets/images/home-inactive.png');
const challengesIconActive = require('../../assets/images/prize-active.png');
const challengesIconInActive = require('../../assets/images/prize-inactive.png');
const rewardsIconActive = require('../../assets/images/rewards-active.png');
const rewardsIconInActive = require('../../assets/images/rewards-inactive.png');
const scannerIcon = require('../../assets/images/scanner.png');
const profileIconActive = require('../../assets/images/profile-active.png');
const profileIconInActive = require('../../assets/images/profile-inactive.png');

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary, // Orange color from design
        tabBarInactiveTintColor: COLORS.inputPlaceHolder,
        tabBarStyle: {
          backgroundColor: COLORS.darkBackground, // Black background like in design
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
          shadowColor: COLORS.darkBackground,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.tabIconContainer, focused && styles.activeTabContainer]}>
              <Image source={focused ? homeActive : homeInactive} style={styles.tabIcon} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.tabIconContainer, focused && styles.activeTabContainer]}>
              <Image source={focused ? challengesIconActive : challengesIconInActive} style={styles.tabIcon} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: '',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.tabIconContainer, focused && styles.activeTabContainer]}>
              <Image source={scannerIcon} style={styles.scanIcon} />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.tabIconContainer, focused && styles.activeTabContainer]}>
              <Image source={focused ? rewardsIconActive : rewardsIconInActive} style={styles.tabIcon} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.tabIconContainer, focused && styles.activeTabContainer]}>
              <Image source={focused ? profileIconActive : profileIconInActive} style={styles.tabIcon} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabContainer: {
    backgroundColor: COLORS.darkBackground,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  scanIcon: {
    width: 74,
    height: 52,
    resizeMode: 'contain',
    transform: [{ translateY: 10 }],
  }
});
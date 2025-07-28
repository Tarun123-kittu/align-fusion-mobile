import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function CenterTabIcon({ focused }: { focused: boolean }) {
  return (
    <View style={[styles.centerTab, focused && styles.centerTabFocused]}>
      <MaterialCommunityIcons
        name="qrcode-scan"
        size={28}
        color={focused ? '#000' : '#FFA500'}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFA500', // Orange color from design
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#000', // Black background like in design
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
          shadowColor: '#000',
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
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={22}
                color={focused ? '#FFA500' : '#666'}
              />
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
              <Ionicons
                name={focused ? "trophy" : "trophy-outline"}
                size={22}
                color={focused ? '#FFA500' : '#666'}
              />
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
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={28}
                color={focused ? '#000' : '#FFA500'}
              />
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
              <Ionicons
                name={focused ? "gift" : "gift-outline"}
                size={22}
                color={focused ? '#FFA500' : '#666'}
              />
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
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={22}
                color={focused ? '#FFA500' : '#666'}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerTab: {
    backgroundColor: '#FFA500', // Orange background
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  centerTabFocused: {
    backgroundColor: '#FFA500',
    transform: [{ scale: 1.1 }],
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activeTabContainer: {
    backgroundColor: 'rgba(255, 165, 0, 0.1)', // Subtle orange glow for active state
  },
});
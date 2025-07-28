import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/Colors';

function CenterTabIcon({ focused }: { focused: boolean }) {
  return (
    <View style={[styles.centerTab, focused && styles.centerTabFocused]}>
      <MaterialCommunityIcons name="qrcode-scan" size={32} color={focused ? '#fff' : COLORS.primary} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#18181B',
          borderTopWidth: 0,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 6,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home" size={24} color={focused ? COLORS.primary : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="trophy-outline" size={24} color={focused ? COLORS.primary : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <CenterTabIcon focused={focused} />,
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="gift-outline" size={24} color={focused ? COLORS.primary : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="person-outline" size={24} color={focused ? COLORS.primary : color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerTab: {
    backgroundColor: '#fff',
    borderRadius: 32,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    borderWidth: 3,
    borderColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  centerTabFocused: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
});

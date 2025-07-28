import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/Colors';

interface HeaderProps {
  greeting: string;
  username: string;
  profileImage?: string;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  greeting,
  username,
  profileImage,
  onProfilePress,
  onNotificationPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onProfilePress} style={styles.profileContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Ionicons name="person-circle" size={40} color={COLORS.primary} />
        )}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
      <TouchableOpacity onPress={onNotificationPress} style={styles.bellContainer}>
        <Ionicons name="notifications-outline" size={28} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  profileContainer: {
    marginRight: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  username: {
    fontSize: 14,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  bellContainer: {
    marginLeft: 8,
  },
});

export default Header; 
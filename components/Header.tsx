import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/Colors';

const notificationIcon = require('../assets/images/notification-light.png');
const profileSample = require('../assets/images/profile-sample.jpg');

interface Props {
  name: string;
}

const Header: React.FC<Props> = ({ name }) => {
  return (
    <View style={styles.header}>
      <View style={styles.profileSection}>
        <Image source={profileSample} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.greetingText}>Good Morning,</Text>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.notificationIcon} onPress={() => router.push('/NotificationScreen')}>
        <Image source={notificationIcon} style={styles.notificationImage} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 14,
  },
  profileInfo: {
    gap: 4,
  },
  greetingText: {
    color: COLORS.textWhite,
    fontSize: 18,
    fontWeight: '600',
  },
  nameText: {
    color: COLORS.textWhite,
    fontSize: 14,
    fontWeight: '400',
  },
  notificationIcon: {},
  notificationImage: {
    width: 32,
    height: 32,
  },
});

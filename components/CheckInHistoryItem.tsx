// components/CheckInHistoryItem.tsx
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/Colors';

const checkInIcon = require('..//assets/images/check-in.png');
const xpStarIcon = require('../assets/images/star.png'); // Replace with actual star icon

interface CheckInHistoryItemProps {
  title: string;
  xp: number;
  time: string;
}

const CheckInHistoryItem: React.FC<CheckInHistoryItemProps> = ({ title, xp, time }) => {
  return (
    <View style={styles.container}>
      <Image source={checkInIcon} style={styles.icon} />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.row}>
          <Text style={styles.xpText}>XP Rewarded -</Text>
          <Image source={xpStarIcon} style={styles.starIcon} />
          <Text style={styles.xpValue}>{`${xp} XP`}</Text>
        </View>

        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default CheckInHistoryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.lightBackground,
    borderColor: '#E5E5E5',
    borderWidth: 0.5,
    marginVertical: 6,
  },
  icon: {
    width: 34,
    height: 34,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  xpText: {
    fontSize: 12,
    color: COLORS.textDark,
    opacity: 0.8,
    fontWeight: 400
  },
  starIcon: {
    width: 14,
    height: 14,
    marginHorizontal: 4,
  },
  xpValue: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '400',
  },
  time: {
    fontSize: 12,
    color: COLORS.textDark,
    opacity: 0.6,
     fontWeight: 400
  },
});

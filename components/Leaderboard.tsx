// components/Leaderboard.tsx
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/Colors';
import BoxShadow from './BoxShadow';

const profileSample = require('../assets/images/profile-sample.jpg');
const star = require('../assets/images/star.png');
const firstPlace = require('../assets/images/first-place.png');
const secondPlace = require('../assets/images/second-place.png');
const thirdPlace = require('../assets/images/third-place.png');

interface LeaderboardItem {
  id: number;
  name: string;
  xp: number;
  rank: number;
  avatar: any;
}

interface Props {
  data: LeaderboardItem[];
  height?: number | string; // height in pixels or percent (e.g., 300 or '100%')
  scrollEnabled?: boolean;
}

const Leaderboard = ({ data, height = 300, scrollEnabled = true }: Props) => {
  const getRankDisplay = (rank: number) => {
    switch (rank) {
      case 1:
        return <Image source={firstPlace} style={styles.rankIcon} />;
      case 2:
        return <Image source={secondPlace} style={styles.rankIcon} />;
      case 3:
        return <Image source={thirdPlace} style={styles.rankIcon} />;
      default:
        return (
          <View style={styles.grayRankContainer}>
            <Text style={styles.grayRankText}>{rank}</Text>
          </View>
        );
    }
  };

  const renderItem = ({ item }: { item: LeaderboardItem }) => (
    <BoxShadow shadowType="light" style={styles.leaderboardItem}>
      <View style={styles.rankContainer}>{getRankDisplay(item.rank)}</View>

      <View style={styles.memberInfoContainer}>
        <Image source={profileSample} style={styles.avatarImage} />
        <Text style={styles.memberName}>{item.name}</Text>
      </View>

      <View style={styles.xpBadge}>
        <Image source={star} style={styles.starIcon} />
        <Text style={styles.xpBadgeText}>{item.xp}</Text>
      </View>
    </BoxShadow>
  );

  return (
    <BoxShadow shadowType="light" height={height} style={[styles.leaderboardContainer, { maxHeight: height }]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        nestedScrollEnabled={true}
        contentContainerStyle={{ gap: 8 }}
      />
    </BoxShadow>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  // Removed shadow properties since BoxShadow handles them
  leaderboardContainer: {
    backgroundColor: COLORS.lightBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    padding: 10,
  },
  // Removed shadow properties since BoxShadow handles them
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.lightBackground,
    overflow: 'hidden',
  },
  rankContainer: {
    height: 48,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  grayRankContainer: {
    width: 30,
    height: 30,
    borderRadius: 16,
    backgroundColor: COLORS.grayBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grayRankText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.grayText,
  },
  memberInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.borderColor,
    gap: 12,
  },
  avatarImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingLeft: 6,
    paddingRight: 12,
    paddingVertical: 11,
  },
  starIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginTop: -2,
  },
  xpBadgeText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.black,
  },
});
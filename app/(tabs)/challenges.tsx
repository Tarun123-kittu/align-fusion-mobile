import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ActiveTaskItem from '../../components/ActiveTaskItem';
import Header from '../../components/Header';
import Leaderboard from '../../components/Leaderboard';
import ReviewTaskItem from '../../components/ReviewTaskItem';
import { COLORS } from '../../constants/Colors';

const star = require('../../assets/images/star.png');

// Types
interface TopPerformer {
  id: string;
  name: string;
  avatar: any;
  xp: number;
  badge?: any;
}

interface TaskItem {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  date: string;
  status: 'active' | 'completed' | 'review';
  assignedTo?: string;
  expireDate?: string;
  theme?: 'green' | 'normal' | 'default' | 'rejected';
}

interface LeaderboardItem {
  id: number;
  name: string;
  avatar: any;
  xp: number;
  rank: number;
}

type TabType = 'Active' | 'Completed' | 'In Review' | 'Leader board';

// Sample data
const topPerformers: TopPerformer[] = [
  { id: '1', name: 'Ann', avatar: require('../../assets/images/profile-sample.jpg'), xp: 5051 },
  { id: '2', name: 'Andrew', avatar: require('../../assets/images/profile-sample.jpg'), xp: 5051 },
  { id: '3', name: 'Sobu', avatar: require('../../assets/images/profile-sample.jpg'), xp: 5051 },
  { id: '4', name: 'Linder', avatar: require('../../assets/images/profile-sample.jpg'), xp: 5051 },
];

const activeTasks: TaskItem[] = [
  {
    id: '1',
    title: 'Safety Challenge',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'active',
    theme: 'green'
  },
  {
    id: '2',
    title: 'Daily Hazard Identification',
    description: 'Complete 5 safety hazard identifications',
    xpReward: 50,
    date: '12/07/2025',
    status: 'active',
    assignedTo: 'James Wilson',
    expireDate: '12/07/2025',
    theme: 'normal'
  },
  {
    id: '3',
    title: 'Equipment Mastery',
    description: 'Complete 5 safety hazard identifications',
    xpReward: 100,
    date: '12/07/2025',
    status: 'active',
    assignedTo: 'James Wilson',
    expireDate: '12/07/2025',
    theme: 'normal'
  }
];

const completedTasks: TaskItem[] = [
  {
    id: '4',
    title: 'Safety Challenge',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'completed',
    theme: 'default'
  },
  {
    id: '5',
    title: 'Daily Hazard Identification',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'completed',
    theme: 'default'
  },
  {
    id: '6',
    title: 'Zero Incident Week',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'completed',
    theme: 'default'
  },
  {
    id: '7',
    title: 'Equipment Mastery',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'completed',
    theme: 'default'
  }
];

const reviewTasks: TaskItem[] = [
  {
    id: '8',
    title: 'Safety Challenge',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'review',
    theme: 'default'
  },
  {
    id: '9',
    title: 'Daily Hazard Identification',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'review',
    theme: 'default'
  },
  {
    id: '10',
    title: 'Zero Incident Week',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'review',
    theme: 'rejected'
  },
  {
    id: '11',
    title: 'Equipment Mastery',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'review',
    theme: 'default'
  }
];

const leaderboardData: LeaderboardItem[] = [
  { id: 1, name: 'Paul C. Ramos', avatar: require('../../assets/images/star.png'), xp: 5075, rank: 1 },
  { id: 2, name: 'Derrick L. Thoman', avatar: require('../../assets/images/star.png'), xp: 5060, rank: 2 },
  { id: 3, name: 'Kelsey T. Donovan', avatar: require('../../assets/images/star.png'), xp: 5045, rank: 3 },
  { id: 4, name: 'Jack L. Gregory', avatar: require('../../assets/images/star.png'), xp: 5001, rank: 4 },
  { id: 5, name: 'Sarah J. Peters', avatar: require('../../assets/images/star.png'), xp: 4998, rank: 5 },
  { id: 6, name: 'Thomas A. Lee', avatar: require('../../assets/images/star.png'), xp: 4975, rank: 6 },
  { id: 7, name: 'Maria S. Gomez', avatar: require('../../assets/images/star.png'), xp: 4950, rank: 7 },
  { id: 8, name: 'Ethan R. Taylor', avatar: require('../../assets/images/star.png'), xp: 4932, rank: 8 },
  { id: 9, name: 'Mia N. Patel', avatar: require('../../assets/images/star.png'), xp: 4908, rank: 9 },
  { id: 10, name: 'Brian K. Smith', avatar: require('../../assets/images/star.png'), xp: 4890, rank: 10 },
];

// Components
const TopPerformanceItem: React.FC<{ item: TopPerformer }> = ({ item }) => (
  <View style={styles.topPerformanceItem}>
    <View style={styles.avatarContainer}>
      <Image source={item.avatar} style={styles.avatarImage} />
      {item.badge && (
        <Image source={item.badge} style={styles.badgeIcon} />
      )}
    </View>
    <Text style={styles.performerName}>{item.name}</Text>
    <View style={[styles.xpContainer]}>
      <Image source={star} style={styles.starIcon} />
      <Text style={styles.xpValue}>{item.xp} XP</Text>
    </View>
  </View>
);

const ChallengesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Active');

  const tabs: TabType[] = ['Active', 'Completed', 'In Review', 'Leader board'];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'Active':
        return activeTasks;
      case 'Completed':
        return completedTasks;
      case 'In Review':
        return reviewTasks;
      case 'Leader board':
        return leaderboardData;
      default:
        return activeTasks;
    }
  };

  const getCurrentTitle = () => {
    switch (activeTab) {
      case 'Active':
        return 'Active Task';
      case 'Completed':
        return 'Completed Task';
      case 'In Review':
        return 'In Review';
      case 'Leader board':
        return 'Leader board';
      default:
        return 'Active Task';
    }
  };

  const handleCompleteTask = (taskId: string) => {
    console.log('Complete task:', taskId);
    // Add your task completion logic here
  };

  const handleRecordPress = (taskId: string) => {
    console.log('Record pressed for task:', taskId);
    // Add your record functionality here
  };

  const renderTaskItem = ({ item }: { item: TaskItem }) => {
    if (activeTab === 'Active') {
      return (
        <ActiveTaskItem
          item={item}
          theme={item.theme as 'green' | 'normal'}
          onCompleteTask={handleCompleteTask}
        />
      );
    } else if (activeTab === 'Completed') {
      return (
        <ReviewTaskItem
          item={item}
          type="completed"
          theme={item.theme as 'default' | 'rejected'}
        />
      );
    } else if (activeTab === 'In Review') {
      return (
        <ReviewTaskItem
          item={item}
          type="review"
          theme={item.theme as 'default' | 'rejected'}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.darkSection}>
          <Header name='Kimberly Mastrangelo' />
        </View>

        <View style={styles.lightSection}>
          <Text style={styles.challengesTitle}>Challenges</Text>

          {/* Top Performance Section */}
          <View style={styles.topPerformanceContainer}>
            <View style={styles.topPerformanceHeader}>
              <Text style={styles.topPerformanceTitle}>Top Performances</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topPerformanceList}
            >
              {topPerformers.map((item) => (
                <TopPerformanceItem key={item.id} item={item} />
              ))}
            </ScrollView>
          </View>

          {/* Tabs Section */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Content Section */}
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>{getCurrentTitle()}</Text>

            {activeTab === 'Leader board' ? (
              <Leaderboard data={getCurrentData() as LeaderboardItem[]} height={300} scrollEnabled={true} />
            ) : (
              <FlatList
                data={getCurrentData() as TaskItem[]}
                keyExtractor={(item) => item.id}
                renderItem={renderTaskItem}
                scrollEnabled={false}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
    paddingBottom: 60,
  },
  scrollView: {
    flex: 1,
  },
  darkSection: {
    backgroundColor: COLORS.darkBackground,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  lightSection: {
    backgroundColor: COLORS.lightBackground,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    paddingHorizontal: 0,
  },
  challengesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 12,
    paddingHorizontal: 20,
  },

  // Top Performance Styles
  topPerformanceContainer: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  topPerformanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  topPerformanceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textDark,
  },
  viewAllText: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '400',
  },
  topPerformanceList: {
    flex: 1,
    gap: 28,
    justifyContent: 'space-between',
  },
  topPerformanceItem: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  badgeIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
  },
  performerName: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Tabs Styles
  tabsContainer: {
    marginBottom: 22,
    backgroundColor: COLORS.tabsBackground,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: COLORS.yellow,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: '400',
  },
  activeTabText: {
    color: COLORS.textWhite,
    fontWeight: '500',
  },

  // Content Styles
  contentSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 14,
  },
  starIcon: {
    width: 14,
    height: 14,
  },
  xpValue: {
    fontSize: 10,
    color: COLORS.yellow,
    fontWeight: '400',
  },
});

export default ChallengesScreen;
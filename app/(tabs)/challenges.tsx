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
import Header from '../../components/Header';
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
}

interface LeaderboardItem {
  id: string;
  name: string;
  avatar: any;
  score: number;
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
    status: 'active'
  },
  {
    id: '2',
    title: 'Daily Hazard Identification',
    description: 'Complete 5 safety hazard identifications',
    xpReward: 100,
    date: '12/07/2025',
    status: 'active',
    assignedTo: 'James Wilson',
    expireDate: '12/07/2025'
  },
  {
    id: '3',
    title: 'Equipment Mastery',
    description: 'Complete 5 safety hazard identifications',
    xpReward: 100,
    date: '12/07/2025',
    status: 'active',
    assignedTo: 'James Wilson',
    expireDate: '12/07/2025'
  }
];

const completedTasks: TaskItem[] = [
  {
    id: '4',
    title: 'Safety Challenge',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'completed'
  },
  {
    id: '5',
    title: 'Daily Hazard Identification',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'completed'
  },
  {
    id: '6',
    title: 'Zero Incident Week',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'completed'
  },
  {
    id: '7',
    title: 'Equipment Mastery',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'completed'
  }
];

const reviewTasks: TaskItem[] = [
  {
    id: '8',
    title: 'Safety Challenge',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'review'
  },
  {
    id: '9',
    title: 'Daily Hazard Identification',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'review'
  },
  {
    id: '10',
    title: 'Zero Incident Week',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'review'
  },
  {
    id: '11',
    title: 'Equipment Mastery',
    description: 'Complete today\'s safety checklist & get 100 XP',
    xpReward: 100,
    date: '01/12/2025',
    status: 'review'
  }
];

const leaderboardData: LeaderboardItem[] = [
  { id: '1', name: 'Paul C. Ramos', avatar: require('../../assets/images/star.png'), score: 5075, rank: 1 },
  { id: '2', name: 'Derrick L. Thoman', avatar: require('../../assets/images/star.png'), score: 5060, rank: 2 },
  { id: '3', name: 'Kelsey T. Donovan', avatar: require('../../assets/images/star.png'), score: 5045, rank: 3 },
  { id: '4', name: 'Jack L. Gregory', avatar: require('../../assets/images/star.png'), score: 5001, rank: 4 },
  { id: '5', name: 'Sarah J. Peters', avatar: require('../../assets/images/star.png'), score: 4998, rank: 5 },
  { id: '6', name: 'Thomas A. Lee', avatar: require('../../assets/images/star.png'), score: 4975, rank: 6 },
  { id: '7', name: 'Maria S. Gomez', avatar: require('../../assets/images/star.png'), score: 4950, rank: 7 },
  { id: '8', name: 'Ethan R. Taylor', avatar: require('../../assets/images/star.png'), score: 4932, rank: 8 },
  { id: '9', name: 'Mia N. Patel', avatar: require('../../assets/images/star.png'), score: 4908, rank: 9 },
  { id: '10', name: 'Brian K. Smith', avatar: require('../../assets/images/star.png'), score: 4890, rank: 10 },
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

const TaskListItem: React.FC<{ item: TaskItem; status: TabType }> = ({ item, status }) => (
  <View style={styles.taskItem}>
    <View style={styles.taskHeader}>
      <View style={styles.taskCategory}>
        <Text style={styles.taskCategoryText}>Safety</Text>
      </View>
      {status === 'Active' && (
        <View style={styles.todayBadge}>
          <Text style={styles.todayBadgeText}>TODAY</Text>
        </View>
      )}
      {status === 'Completed' && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>✓</Text>
        </View>
      )}
    </View>

    <Text style={styles.taskTitle}>{item.title}</Text>
    <Text style={styles.taskDescription}>{item.description}</Text>

    <View style={styles.taskFooter}>
      <View style={styles.xpReward}>
        <Text style={styles.xpText}>XP Rewarded: </Text>
        <View style={styles.starContainer}>
          <Text style={styles.starIcon}>⭐</Text>
          <Text style={styles.xpValue}>{item.xpReward}</Text>
        </View>
        <Text style={styles.dateText}>📅 Date: {item.date}</Text>
      </View>
    </View>

    {item.assignedTo && (
      <View style={styles.assignmentInfo}>
        <Text style={styles.assignedText}>👤 Assigned To: {item.assignedTo}</Text>
        <Text style={styles.expireText}>📅 Expire Date: {item.expireDate}</Text>
      </View>
    )}

    {status === 'Active' && (
      <TouchableOpacity style={styles.completeButton}>
        <Text style={styles.completeButtonText}>Complete Task</Text>
      </TouchableOpacity>
    )}

    {status === 'In Review' && (
      <TouchableOpacity style={styles.recordButton}>
        <Text style={styles.recordButtonText}>Record</Text>
      </TouchableOpacity>
    )}
  </View>
);

const LeaderboardItem: React.FC<{ item: LeaderboardItem }> = ({ item }) => (
  <View style={styles.leaderboardItem}>
    <View style={styles.rankContainer}>
      <Text style={styles.rankNumber}>{item.rank}</Text>
    </View>
    <Image source={item.avatar} style={styles.leaderboardAvatar} />
    <Text style={styles.leaderboardName}>{item.name}</Text>
    <View style={styles.scoreContainer}>
      <Text style={styles.starIcon}>⭐</Text>
      <Text style={styles.scoreText}>{item.score}</Text>
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
              style={styles.topPerformanceList}
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
            style={styles.tabsContainer}
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
              <FlatList
                data={getCurrentData() as LeaderboardItem[]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <LeaderboardItem item={item as LeaderboardItem} />}
                scrollEnabled={false}
              />
            ) : (
              <FlatList
                data={getCurrentData() as TaskItem[]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TaskListItem item={item as TaskItem} status={activeTab} />}
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
    paddingBottom: 80,
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
    minHeight: 600,
  },
  challengesTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.textDark,
    marginBottom: 14,
    paddingHorizontal: 20,
  },

  // Top Performance Styles
  topPerformanceContainer: {
    marginBottom: 20,
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
    marginBottom: 10,
  },
  topPerformanceItem: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
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
    marginTop: 8,
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
    marginBottom: 20,
    backgroundColor: "#fef8e4",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#FFB800',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: '600',
  },

  // Content Styles
  contentSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },

  // Task Item Styles
  taskItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskCategory: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  taskCategoryText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  todayBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  todayBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  completedBadge: {
    backgroundColor: '#4CAF50',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  taskFooter: {
    marginBottom: 8,
  },
  xpReward: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  xpText: {
    fontSize: 12,
    color: '#666',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  starIcon: {
    width: 14,
    height: 14,
  },
  xpValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  assignmentInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  assignedText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  expireText: {
    fontSize: 12,
    color: '#666',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  completeButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  recordButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  recordButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  // Leaderboard Styles
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  rankContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  leaderboardAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  leaderboardName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default ChallengesScreen;
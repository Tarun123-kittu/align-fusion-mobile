import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../../components/Header';
import Leaderboard from '../../components/Leaderboard';
import { COLORS } from '../../constants/Colors';
import { fetchExample, login, setAuthToken } from '../api';
import { useUser } from '../context/UserContext';

const fire = require('../../assets/images/fire.png');
const ranking = require('../../assets/images/ranking.png');
const task = require('../../assets/images/task.png');
const calendar = require('../../assets/images/calendar.png');

const HomeScreen = () => {
  const { user, login: setUser, addXP, addReward } = useUser();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['example'],
    queryFn: fetchExample,
    enabled: !!user?.token,
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data);
      setAuthToken(data.token);
      Toast.show({ type: 'success', text1: 'Login Success', text2: `Welcome ${data.name}` });
      queryClient.invalidateQueries({ queryKey: ['example'] });
    },
    onError: (err) => {
      Toast.show({ type: 'error', text1: 'Login Failed', text2: err.message });
    },
  });


  // Static data
  const staticUser = {
    name: 'Kimberly Montemayor',
    xp: 2450,
    level: 62,
    nextLevelXP: 550,
    dayStreak: 15,
    ranking: 5,
    task: 6
  };

  const todayTasks = [
    {
      id: 1,
      title: 'Daily Check-in',
      description: 'Scan QR code at your workstation',
      xp: '50',
      status: 'active'
    },
    {
      id: 2,
      title: 'Safety Challenge',
      description: 'Complete today safety challenge',
      xp: '100',
      status: 'completed'
    }
  ];

  const leaderboard = [
    { id: 1, name: 'Paul C. Ramos', xp: 5075, rank: 1, avatar: '👨‍💼' },
    { id: 2, name: 'Derrick L. Thomas', xp: 5060, rank: 2, avatar: '👨‍🔧' },
    { id: 3, name: 'Kelsey T. Donovan', xp: 5045, rank: 3, avatar: '👩‍💼' },
    { id: 4, name: 'Jack L. Gregory', xp: 5001, rank: 4, avatar: '👨‍🏭' },
    { id: 5, name: 'Kimberly Montemayor', xp: 2450, rank: 5, avatar: '👩‍💻' },
    { id: 6, name: 'John D. Smith', xp: 2000, rank: 6, avatar: '👨‍💼' },
    { id: 7, name: 'Sarah J. Johnson', xp: 1500, rank: 7, avatar: '👩‍💼' },
    { id: 8, name: 'Michael A. Brown', xp: 1200, rank: 8, avatar: '👨‍🔧' },
    { id: 9, name: 'Emily R. Davis', xp: 1000, rank: 9, avatar: '👩‍🏭' },
    { id: 10, name: 'David M. Wilson', xp: 800, rank: 10, avatar: '👨‍💻' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Dark Background Section */}
        <View style={styles.darkSection}>
          {/* Header with Profile and Notification */}
          <Header name='Kimberly Montemayor' />

          {/* XP Card */}
          <View style={styles.xpCard}>
            {/* Date and XP */}
            <View style={styles.xpHeaderRow}>
              <Text style={styles.dateText}>May 16, 2023 10:05 am</Text>
              <Text style={styles.xpAmount}>{staticUser.xp.toLocaleString()} XP</Text>
            </View>

            {/* Progress Title */}
            <Text style={styles.progressTitle}>Your Progress</Text>
            <View style={styles.levelRow}>
              <Text style={styles.levelText}>Level {String(staticUser.level).padStart(2, '0')}</Text>
              <Text style={styles.nextLevelText}>{staticUser.nextLevelXP} XP to next level</Text>
            </View>


            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${100 - (staticUser.nextLevelXP / (staticUser.xp + staticUser.nextLevelXP) * 100)}%` }]} />
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <View style={styles.statsItemRow}>
                  <Image source={fire} style={[styles.statIcon, { marginRight: -5 }]} />
                  <Text style={styles.statValue}>{staticUser.dayStreak}</Text>
                </View>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
              <View style={styles.statItem}>
                <View style={styles.statsItemRow}>
                  <Image source={ranking} style={styles.statIcon} />
                  <Text style={styles.statValue}>{staticUser.ranking.toString().padStart(2, '0')}</Text>
                </View>
                <Text style={styles.statLabel}>Ranking</Text>
              </View>
              <View style={styles.statItem}>
                <View style={styles.statsItemRow}>
                  <Image source={task} style={styles.statIcon} />
                  <Text style={styles.statValue}>{staticUser.task.toString().padStart(2, '0')}</Text>
                </View>
                <Text style={styles.statLabel}>Task</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.darkBackground}>
          {/* White Background Section */}
          <View style={styles.whiteSection}>
            {/* Today's Task Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{`Today's Task`}</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.taskList}>

                {todayTasks.map((task, index) => (
                  <View key={task.id} style={[
                    styles.taskCard,
                    {
                      backgroundColor: index % 2 === 0 ? COLORS.lightCard : COLORS.lightGreenCard,
                      borderColor: index % 2 === 0 ? COLORS.lightCardBorder : COLORS.lightGreenCardBorder,
                    }
                  ]}>
                    <View style={styles.taskContent}>
                      <View style={[
                        styles.tagContainer,
                        {
                          backgroundColor: index % 2 === 0 ? COLORS.lightCardTag : COLORS.lightGreenCardTag,
                        }
                      ]}>
                        <Text style={[
                          styles.tagText,
                          {
                            color: index % 2 === 0 ? COLORS.lightCardText : COLORS.lightGreenCardText,
                          }
                        ]}>
                          {task.title}
                        </Text>
                      </View>
                      <Text style={styles.taskTitle}>{task.title}</Text>
                      <Text style={styles.taskDescription}>{task.description}</Text>
                    </View>

                    <View style={styles.taskButton}>
                      <Text style={styles.taskButtonText}>+{task.xp} XP</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Attendance Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Attendance</Text>
              </View>
              <TouchableOpacity style={styles.attendanceButton} onPress={() => router.push('/CheckInHistory')}>
                <Image source={calendar} style={styles.attendanceImage} />
                <Text style={styles.attendanceButtonText}>Check-in History</Text>
              </TouchableOpacity>
            </View>

            {/* Team Leaderboard Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Team Leader board</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

                <Leaderboard data={leaderboard} height={300} scrollEnabled={true} />
            </View>
          </View>
        </View>
    
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    paddingBottom: 80,
  },
  scrollView: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkBackground,
  },
  loginText: {
    fontSize: 18,
    color: COLORS.textWhite,
    marginBottom: 20,
  },

  // Dark Section Styles
  darkSection: {
    backgroundColor: COLORS.darkBackground,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
  },

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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: COLORS.textWhite,
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    // flex: 1,
    gap: 4
  },
  greetingText: {
    color: COLORS.textWhite,
    fontSize: 18,
    fontWeight: 600
  },
  nameText: {
    color: COLORS.textWhite,
    fontSize: 14,
    fontWeight: 400,
  },
  notificationIcon: {
    // padding: 8,
  },
  notificationImage: {
    width: 32,
    height: 32,
  },
  notificationText: {
    fontSize: 24,
  },
  dateSection: {
    marginBottom: 20,
  },
  dateText: {
    color: COLORS.textDark,
    fontSize: 12,
    fontWeight: 400,
  },
  progressTitle: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 4,
  },
  xpCard: {
    backgroundColor: COLORS.lightBackground,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  xpAmount: {
    color: COLORS.textDark,
    fontSize: 18,
    fontWeight: 600,
  },
  levelText: {
    color: COLORS.textDark,
    fontSize: 12,
    fontWeight: 400,
  },
  nextLevelText: {
    color: COLORS.textDark,
    fontSize: 12,
    fontWeight: 400,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsItemRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5
  },
  xpHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: COLORS.progressBarGray,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 12
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.progressBarBlue,
    borderRadius: 5,
  },
  statItem: {
    gap: 3
  },
  statIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    objectFit: 'contain',
  },
  statValue: {
    color: COLORS.textDark,
    fontSize: 18,
    fontWeight: 600,
  },
  statLabel: {
    color: COLORS.textDark,
    fontSize: 12,
    fontWeight: 400,
  },

  // White Section Styles
  whiteSection: {
    backgroundColor: COLORS.lightBackground,
    // borderTopLeftRadius: 24,
    borderTopRightRadius: 32,
    // marginTop: -10,
    paddingTop: 24,
    paddingHorizontal: 20,
    minHeight: 600,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: COLORS.textDark,
  },
  viewAllText: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: 400,
  },
  darkBackground: {
    backgroundColor: COLORS.darkBackground,
  },
  // Task Styles

  taskList: {
    gap: 12,
  },
  activeButton: {
    backgroundColor: COLORS.secondary,
  },
  completedButton: {
    backgroundColor: COLORS.green,
  },

  activeButtonText: {
    color: COLORS.textWhite,
  },
  completedButtonText: {
    color: COLORS.textWhite,
  },
  taskCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
  },
  tagContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderRadius: 4,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: 700,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: COLORS.black,
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 12,
    color: COLORS.textDark,
  },
  taskButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  taskButtonText: {
    color: COLORS.textWhite,
    fontWeight: 700,
    fontSize: 10,
  },

  // Attendance Styles
  attendanceButton: {
    backgroundColor: COLORS.purple,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  attendanceImage: {
    width: 24,
    height: 24,
  },
  attendanceButtonText: {
    color: COLORS.textWhite,
    fontSize: 14,
    fontWeight: 500,
  },

});
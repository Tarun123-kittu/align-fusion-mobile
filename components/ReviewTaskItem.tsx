// components/ReviewTaskItem.tsx
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/Colors';
import BoxShadow from './BoxShadow';

const star = require('../assets/images/star.png');
const calendarBalck = require('../assets/images/calendar-icon-black.png');

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

interface ReviewTaskItemProps {
    item: TaskItem;
    type: 'completed' | 'review';
    theme?: 'default' | 'rejected';
}

const ReviewTaskItem: React.FC<ReviewTaskItemProps> = ({
    item,
    type,
    theme = 'default',
}) => {
    const isRejected = theme === 'rejected';
    const isCompleted = type === 'completed';
    const isReview = type === 'review';

    const getCardStyle = () => {
        if (isRejected) {
            return {
                backgroundColor: COLORS.lighRedBackground,
                borderColor: COLORS.lightBackground,
            };
        }
        return {
            backgroundColor: COLORS.lightBackground,
            borderColor: COLORS.borderColor,
        };
    };

    const getRightBadge = () => {
        if (isRejected) {
            return (
                <View style={styles.rejectedBadge}>
                    <Text style={styles.rejectedBadgeText}>Rejected</Text>
                </View>
            );
        }
        return null;
    };

    return (
        <BoxShadow shadowType="light" style={[styles.taskItem, getCardStyle()]}>
            {/* <View style={styles.taskHeader}>
                <View style={styles.taskCategory}>
                    <Text style={styles.taskCategoryText}>Safety</Text>
                </View>
            </View> */}

            <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                {getRightBadge()}
            </View>

            <Text style={styles.taskDescription}>{item.description}</Text>

            <View style={styles.taskFooter}>
                <View style={styles.xpReward}>
                    <Text style={styles.xpText}>XP Rewarded - </Text>
                    <View style={styles.starContainer}>
                        <Image source={star} style={styles.starIcon} />
                        <Text style={styles.xpValue}>{item.xpReward} XP</Text>
                    </View>
                    <View style={styles.calendarContainer}>
                        <Image source={calendarBalck} style={styles.calendarIcon} />
                        <Text style={styles.dateText}>Date: {item.date}</Text>
                    </View>
                </View>
            </View>

        </BoxShadow>
    );
};

export default ReviewTaskItem;

const styles = StyleSheet.create({
    taskItem: {
        borderRadius: 12,
        borderWidth: 1,
        padding: 14,
        marginBottom: 14,
        borderColor: COLORS.lightBackground,
    },
    taskHeader: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    taskCategory: {
        backgroundColor: '#E8F5E8',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    taskCategoryText: {
        color: COLORS.green,
        fontSize: 10,
        fontWeight: '500',
    },
    completedBadge: {
        backgroundColor: COLORS.green,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedBadgeText: {
        color: COLORS.textWhite,
        fontSize: 12,
        fontWeight: 'bold',
    },
    rejectedBadge: {
        backgroundColor: COLORS.error,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    rejectedBadgeText: {
        color: COLORS.textWhite,
        fontSize: 10,
        fontWeight: '400',
    },
    taskTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textDark,
    },
    taskContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    taskDescription: {
        fontSize: 12,
        color: COLORS.textDark,
        marginBottom: 5,
    },
    taskFooter: {
    },
    xpReward: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    xpText: {
        fontSize: 12,
        color: COLORS.textDark,
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 14,
    },
    starIcon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
    xpValue: {
        fontSize: 10,
        color: COLORS.yellow,
        fontWeight: '400',
    },
    calendarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    calendarIcon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
    },
    dateText: {
        fontSize: 12,
        color: COLORS.textDark,
    },
    expireText: {
        fontSize: 12,
        color: COLORS.textDark,
    },
    recordButton: {
        backgroundColor: COLORS.secondary,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 12,
        alignSelf: 'flex-end',
    },
    recordButtonText: {
        color: COLORS.textWhite,
        fontSize: 12,
        fontWeight: '600',
    },
});
// components/ActiveTaskItem.tsx
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/Colors';
import BoxShadow from './BoxShadow';

const star = require('../assets/images/star.png');
const calendarBalck = require('../assets/images/calendar-icon-black.png');
const people = require('../assets/images/peoples.png');

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

interface ActiveTaskItemProps {
    item: TaskItem;
    theme?: 'green' | 'normal';
    onCompleteTask?: (taskId: string) => void;
}

const ActiveTaskItem: React.FC<ActiveTaskItemProps> = ({
    item,
    theme = 'normal',
    onCompleteTask
}) => {
    const isGreenTheme = theme === 'green';

    const getCardStyle = () => {
        return isGreenTheme ? {
            backgroundColor: COLORS.lightGreenCard,
            borderColor: COLORS.lightGreenCardBorder,
        } : {
            backgroundColor: COLORS.lightCard,
            borderColor: COLORS.lightCardBorder,
        };
    };

    const getTagStyle = () => {
        return isGreenTheme ? {
            backgroundColor: COLORS.lightGreenCardTag,
        } : {
            backgroundColor: COLORS.lightCardTag,
        };
    };

    const getTagTextStyle = () => {
        return isGreenTheme ? {
            color: COLORS.lightGreenCardText,
        } : {
            color: COLORS.lightCardText,
        };
    };

    const getCompleteButtonStyle = () => {
        return isGreenTheme ? {
            backgroundColor: COLORS.lightGreenCardText,
        } : {
            backgroundColor: COLORS.buttonBackground,
        };
    };

    return (
        <BoxShadow shadowType="light" style={[styles.taskItem, getCardStyle()]}>
            {isGreenTheme &&
                <View style={styles.taskHeader}>
                    <View style={[styles.taskCategory, getTagStyle()]}>
                        <Text style={[styles.taskCategoryText, getTagTextStyle()]}>Safety</Text>
                    </View>
                    <View style={styles.todayBadge}>
                        <Text style={styles.todayBadgeText}>+50 XP</Text>
                    </View>
                </View>
            }

            <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                {!isGreenTheme &&
                    <View style={styles.todayBadge}>
                        <Text style={styles.todayBadgeText}>+50 XP</Text>
                    </View>
                }
            </View>
            <Text style={styles.taskDescription}>{item.description}</Text>

            {item.assignedTo && (
                <View style={styles.assignmentInfo}>
                    <View style={styles.calendarContainer}>
                        <Image source={people} style={styles.calendarIcon} />
                        <Text style={styles.assignedText}>Assigned To: {item.assignedTo}</Text>
                    </View>

                    <View style={styles.calendarContainer}>
                        <Image source={calendarBalck} style={styles.calendarIcon} />
                        <Text style={styles.dateText}>Date: {item.date}</Text>
                    </View>

                    <View style={styles.calendarContainer}>
                        <Image source={calendarBalck} style={styles.calendarIcon} />
                        <Text style={styles.dateText}>Expire Date: {item.expireDate}</Text>
                    </View>
                </View>
            )}

            <TouchableOpacity
                style={[styles.completeButton, getCompleteButtonStyle()]}
                onPress={() => onCompleteTask?.(item.id)}
            >
                <Text style={styles.completeButtonText}>Complete Task</Text>
            </TouchableOpacity>
        </BoxShadow>
    );
};

export default ActiveTaskItem;

const styles = StyleSheet.create({
    taskItem: {
        borderRadius: 12,
        borderWidth: 0.5,
        padding: 14,
        marginBottom: 14,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    taskContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskCategory: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    taskCategoryText: {
        fontSize: 10,
        fontWeight: '700',
    },
    todayBadge: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    todayBadgeText: {
        color: COLORS.textWhite,
        fontSize: 10,
        fontWeight: '700',
    },
    taskTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    taskDescription: {
        fontSize: 12,
        color: COLORS.textDark,
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
        color: COLORS.textDark,
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    starIcon: {
        fontSize: 12,
    },
    xpValue: {
        fontSize: 12,
        color: COLORS.yellow,
        fontWeight: '500',
        marginLeft: 2,
    },
    dateText: {
        fontSize: 14,
        color: COLORS.textDark,
    },
    assignmentInfo: {
        marginTop: 5,
        paddingTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    assignedText: {
        fontSize: 14,
        color: COLORS.textDark,
        marginBottom: 4,
    },
    expireText: {
        fontSize: 12,
        color: COLORS.textDark,
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
    completeButton: {
        paddingVertical: 10,
        borderRadius: 66,
        marginTop: 14,
    },
    completeButtonText: {
        color: COLORS.textWhite,
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '500',
    },
});
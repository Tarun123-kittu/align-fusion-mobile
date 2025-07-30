import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/Colors';

const completedIcon = require('../assets/images/completed.png');
const inProgressIcon = require('../assets/images/in-progress.png');
const newIcon = require('../assets/images/new.png');
const expire = require('../assets/images/expire.png');

interface NotificationItemData {
    id: number;
    type: 'in_progress' | 'completed' | 'new' | 'expire';
    title: string;
    description: string;
    time: string;
}

interface NotificationItemProps {
    item: NotificationItemData;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
    const getNotificationStyle = (type: NotificationItemData['type']) => {
        switch (type) {
            case 'in_progress':
                return {
                    backgroundColor: COLORS.lightBackground,
                    icon: inProgressIcon,
                    tagText: 'In Progress',
                    tagBackgroundColor: COLORS.inProgressTabColor,
                };
            case 'completed':
                return {
                    backgroundColor: COLORS.lightBackground,
                    icon: completedIcon,
                    tagText: 'Completed',
                    tagBackgroundColor: COLORS.green,
                };
            case 'new':
                return {
                    backgroundColor: COLORS.lightBackground,
                    icon: newIcon,
                    tagText: 'New',
                    tagBackgroundColor: COLORS.purple,
                };
            case 'expire':
                return {
                    backgroundColor: COLORS.lighRedBackground,
                    icon: expire,
                    tagText: 'Expired',
                    tagBackgroundColor: COLORS.error,
                };
            default:
                return {
                    backgroundColor: COLORS.lightBackground,
                    icon: newIcon,
                    tagText: 'Default',
                    tagBackgroundColor: COLORS.inputPlaceHolder,
                };
        }
    };

    const style = getNotificationStyle(item.type);

    return (
        <View style={[styles.container, { backgroundColor: style.backgroundColor }]}>
            {/* Left Icon */}
            <Image source={style.icon} style={styles.icon} />

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.title}
                    </Text>
                    {
                        item.type !== "expire" &&
                        <View style={[styles.tag, { backgroundColor: style.tagBackgroundColor }]}>
                            <Text style={styles.tagText}>{style.tagText}</Text>
                        </View>
                    }
                </View>

                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>

                <Text style={styles.time}>{item.time}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
        marginVertical: 7,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: '#E5E5E5',

        // Very light iOS Shadow for individual items
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.02,
        shadowRadius: 2,

        // Very light Android Shadow for individual items
        elevation: 0.3,
    },
    icon: {
        width: 34,
        height: 34,
        marginRight: 8,
    },
    content: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textDark,
        flex: 1,
        marginRight: 8,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 24,
        alignSelf: 'flex-start',
    },
    tagText: {
        fontSize: 9,
        fontWeight: '400',
        color: COLORS.textWhite,
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 12,
        color: COLORS.textDark,
        opacity: 0.8,
        lineHeight: 16,
        marginBottom: 6,
    },
    time: {
        fontSize: 12,
        color: COLORS.textDark,
        opacity: 0.6,
        fontWeight: 400
    },
});

export default NotificationItem;
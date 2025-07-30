import React from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import NotificationItem from '../components/NotificationItem';
import { COLORS } from '../constants/Colors';

const backButton = require('../assets/images/arrow-back.png');

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface NotificationData {
    id: number;
    type: 'in_progress' | 'completed' | 'new' | 'expire';
    title: string;
    description: string;
    time: string;
}

interface NotificationScreenProps {
    visible: boolean;
    onClose: () => void;
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ visible, onClose }) => {
    const slideAnim = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const [isVisible, setIsVisible] = React.useState(visible);

    React.useEffect(() => {
        if (visible) {
            setIsVisible(true); // Show modal immediately
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: SCREEN_HEIGHT,
                useNativeDriver: true,
                duration: 200, // fast close
            }).start(() => {
                setIsVisible(false); // Actually hide modal
            });
        }
    }, [visible]);


    const notificationData: NotificationData[] = [
        {
            id: 1,
            type: 'in_progress',
            title: 'Certificate Approval request',
            description: 'Your OSHA 30 certification has been sent to manager for approval',
            time: '2 hours ago',
        },
        {
            id: 2,
            type: 'completed',
            title: 'Task Completed Approval Request',
            description: 'Your OSHA 30 certification has been sent to manager for approval',
            time: '2 hours ago',
        },
        {
            id: 3,
            type: 'new',
            title: 'New Task Assigned',
            description: 'Daily Equipment check assigned by John Martinez',
            time: '2 hours ago',
        },
        {
            id: 4,
            type: 'completed',
            title: 'Task Approved - Xp Earned',
            description: 'Daily Equipment check assigned by John Martinez',
            time: '2 hours ago',
        },
        {
            id: 5,
            type: 'expire',
            title: 'Expire Certification Reminder',
            description: 'Your OSHA 30 certification has been expire from last 15 days',
            time: '2 hours ago',
        },
    ];

    const renderNotificationItem = ({ item }: { item: NotificationData }) => (
        <NotificationItem item={item} />
    );

    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: SCREEN_HEIGHT,
            useNativeDriver: true,
            duration: 200,
        }).start(() => {
            setIsVisible(false);
            onClose(); // Tell parent modal is closed
        });
    };

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="none"
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={handleClose}
                />

                <Animated.View
                    style={[
                        styles.container,
                        {
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <SafeAreaView style={styles.safeArea}>
                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={handleClose} style={styles.backButton}>
                                <Image source={backButton} style={styles.backButtonImage} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Notifications</Text>
                            <View style={styles.placeholder} />
                        </View>



                        {/* Notification List */}
                        <FlatList
                            data={notificationData}
                            keyExtractor={(item: NotificationData) => item.id.toString()}
                            renderItem={renderNotificationItem}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContainer}
                            ListHeaderComponent={
                                <View style={styles.subHeader}>
                                    <Text style={styles.subHeaderText}>
                                        Keep track of important updates, tasks, and approvals.
                                    </Text>
                                </View>
                            }
                        />
                    </SafeAreaView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backdrop: {
        flex: 1,
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT * 0.9,
        backgroundColor: COLORS.lightBackground,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor,
    },
    backButton: {
        // padding: 4,
    },
    backButtonImage: {
        width: 24,
        height: 24,
    },
    backIcon: {
        fontSize: 24,
        color: COLORS.textDark,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textDark,
    },
    placeholder: {
        width: 32,
    },
    subHeader: {
        paddingTop: 14,
        paddingBottom: 7,
    },
    subHeaderText: {
        fontSize: 14,
        fontWeight: '400',
        color: COLORS.textDark,
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
});

export default NotificationScreen;
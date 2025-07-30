import { router } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import CheckInHistoryItem from '../components/CheckInHistoryItem';
import { COLORS } from '../constants/Colors';

const backButton = require('../assets/images/arrow-back.png');

interface CheckInItem {
    id: number;
    title: string;
    xp: number;
    time: string;
}

const CheckInHistory = () => {
    const checkInData: CheckInItem[] = [
        { id: 1, title: 'Daily Check-in', xp: 180, time: '2 hours ago' },
        { id: 2, title: 'Daily Check-in', xp: 180, time: 'Yesterday, 09:24am' },
        { id: 3, title: 'Daily Check-in', xp: 180, time: '12/06/2025, 09:24am' },
        { id: 4, title: 'Daily Check-in', xp: 180, time: '11/06/2025, 09:24am' },
        { id: 5, title: 'Daily Check-in', xp: 180, time: '10/06/2025, 09:24am' },
        { id: 6, title: 'Daily Check-in', xp: 180, time: '09/06/2025, 09:24am' },
    ];

    const renderItem = ({ item }: { item: CheckInItem }) => (
        <CheckInHistoryItem title={item.title} xp={item.xp} time={item.time} />
    );

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
            <View style={[styles.container]}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={backButton} style={styles.backButtonImage} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Check-in History</Text>
                        <View style={styles.placeholder} />
                    </View>

                    <FlatList
                        data={checkInData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                        ListHeaderComponent={
                            <View style={styles.subHeader}>
                                <Text style={styles.subHeaderText}>
                                    Track Your Previous Check-ins and Attendance Logs
                                </Text>
                            </View>
                        }
                    />
                </SafeAreaView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightBackground,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 12,
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
    backButtonImage: {
        width: 24,
        height: 24,
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

export default CheckInHistory;

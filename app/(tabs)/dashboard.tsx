import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

// Type Definitions for the Dashboard Data
type Profile = {
    username: string;
    avatar: string;
};

type AnalyticsItem = {
    title: string;
    count: number;
    route: string;
};

type Update = {
    notifications: string[];
};

type DashboardData = {
    profile: Profile;
    analytics: AnalyticsItem[];
    updates: Update[];
};

// Sample Dashboard Data (to be replaced by API data in the future)
const dashboardData: DashboardData = {
    profile: {
        username: 'JohnDoe',
        avatar: 'https://picsum.photos/200/300.jpg', // Replace with an actual avatar URL
    },
    analytics: [
        { title: 'Playgrounds', count: 5, route: 'playground' },
        { title: 'Activities', count: 12, route: 'activities' },
    ],
    updates: [
        {
            notifications: [
                '2 PlayUnits under maintenance.',
                'New PlayUnits coming soon to your area!',
            ],
        },
    ],
};

export default function DashboardScreen(): JSX.Element {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.bentoContainer}>
                {/* Action Card */}
                <View style={[styles.card, styles.largeCard]}>
                    <Image
                        source={{ uri: 'https://picsum.photos/200/300.jpg' }}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.cardTitle}>Explore Maps</Text>
                    <Text style={styles.cardDescription}>
                        Ensure kids wear safety gear and follow rules for each activity.
                    </Text>
                </View>

                {/* Analytics Cards */}
                {dashboardData.analytics.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.card, styles.smallCard]}
                        onPress={() => router.push(item.route)}
                    >
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardCount}>{item.count}</Text>
                    </TouchableOpacity>
                ))}

                {/* Profile Card */}
                <TouchableOpacity
                    style={[styles.profile]}
                    onPress={() => router.push('profile')}
                >
                    <Image
                        source={{ uri: dashboardData.profile.avatar }}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    <View style={styles.profileView}>
                        <Text style={styles.cardTitle}>Welcome,</Text>
                        <Text style={styles.cardDescription}>
                            {dashboardData.profile.username}!
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Notifications */}
                {dashboardData.updates.map((update, index) => (
                    <View key={index} style={[styles.card, styles.largeCard]}>
                        <Text style={styles.cardTitle}>Latest Updates</Text>
                        {update.notifications.map((notification, i) => (
                            <Text key={i} style={styles.cardDescription}>
                                {notification}
                            </Text>
                        ))}
                    </View>
                ))}

                {/* Informational Card */}
                <View style={[styles.card, styles.largeCard]}>
                    <Image
                        source={{ uri: 'https://picsum.photos/200/300.jpg' }}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.cardTitle}>Tips for Safe Play</Text>
                    <Text style={styles.cardDescription}>
                        Ensure kids wear safety gear and follow rules for each activity.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    bentoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 16,
        marginBottom: 16,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
    },
    cardCount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4CAF50',
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 14,
        color: '#757575',
    },
    cardImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 16,
        alignSelf: 'center',
    },
    smallCard: {
        width: screenWidth / 2 - 24,
    },
    profile: {
        flexDirection: 'row',
        width: '100%',
        height: 120,
        justifyContent: 'flex-start',
    },
    profileView: {
        padding: 16,
    },
    largeCard: {
        width: screenWidth - 32,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});

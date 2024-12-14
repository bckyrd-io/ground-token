import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

type Profile = {
    username: string;
    avatar: string;
};

type AnalyticsItem = {
    title: string;
    count: number;
    route: string;
};

type DashboardData = {
    profile: Profile;
    analytics: AnalyticsItem[];
};

const dashboardData: DashboardData = {
    profile: {
        username: 'JohnDoe',
        avatar: 'https://picsum.photos/200',
    },
    analytics: [
        { title: 'Playgrounds', count: 5, route: 'playground' },
        { title: 'Activities', count: 12, route: 'activities' },
    ],
};

export default function DashboardScreen(): JSX.Element {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.container}>


            {/* Action Section */}
            <TouchableOpacity style={styles.actionSection} onPress={() => router.push('/MapScreen')}>
                <Image
                    source={{ uri: 'https://picsum.photos/200' }}
                    style={styles.actionImage}
                    resizeMode="cover"
                />
                <Text style={styles.actionTitle}>Explore Maps</Text>
                <Text style={styles.actionDescription}>
                    Discover play areas and plan your visits.
                </Text>
            </TouchableOpacity>

            {/* Analytics Section */}
            <View style={styles.analyticsContainer}>
                <TouchableOpacity
                    style={[styles.analyticsItem, { backgroundColor: '#28a745' }]} // Green background
                    onPress={() => router.push('/PlaygroundScreen')}
                >
                    <Text style={styles.analyticsTitle}>Playground</Text>
                    <Text style={styles.analyticsCount}>{dashboardData.analytics[0].count}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.analyticsItem, { backgroundColor: '#f1c40f' }]} // Yellow background
                    onPress={() => router.push('/StatusScreen')}
                >
                    <Text style={styles.analyticsTitle}>Activity</Text>
                    <Text style={styles.analyticsCount}>{dashboardData.analytics[1].count}</Text>
                </TouchableOpacity>

            </View>

            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: dashboardData.profile.avatar }}
                    style={styles.avatar}
                    resizeMode="cover"
                />
                <View style={styles.profileView}>
                    <Text style={styles.welcomeText}>Welcome,</Text>
                    <Text style={styles.usernameText}>{dashboardData.profile.username}</Text>
                </View>
            </View>

            {/* Notifications Section */}
            <View style={styles.notifications}>
                <Text style={styles.notificationsTitle}>Latest Updates</Text>
                <Text style={styles.notificationText}>2 PlayUnits under maintenance.</Text>
                <Text style={styles.notificationText}>
                    New PlayUnits coming soon to your area!
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    profileSection: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    profileView: {
        flexDirection: 'column',
        padding: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    welcomeText: {
        fontSize: 18,
        color: '#333',
    },
    usernameText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    actionSection: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
    },
    actionImage: {
        width: '100%',
        height: 150,
    },
    actionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
        padding: 16,
        paddingBottom: 0,
    },
    actionDescription: {
        fontSize: 14,
        color: '#555',
        padding: 16,
        paddingTop: 8,
    },
    analyticsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    analyticsItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: screenWidth / 2 - 24,
        alignItems: 'center',
    },
    analyticsTitle: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 8,
    },
    analyticsCount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    notifications: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    notificationsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 8,
    },
    notificationText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
});

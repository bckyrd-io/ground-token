import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../store'; // Import Zustand Store

// Define types for the profile and data
interface Profile {
    username: string;
    avatar: string;
}

interface Notification {
    id: string;
    message: string;
}

interface AnalyticsItem {
    route: string;
    count: number;
    title: string;
}

// Styles and Dimensions
const { width } = Dimensions.get('window');

// Dashboard Component
export default function DashboardScreen(): JSX.Element {
    const router = useRouter();
    const {
        profile,
        fetchProfile,
    } = useStore();

    const [notifications, setNotifications] = React.useState<Notification[]>([]);
    const [analytics, setAnalytics] = React.useState<AnalyticsItem[]>([]);

    // Fetch data on mount
    useEffect(() => {
        fetchProfile(); // Fetch profile data from store

        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/notifications');
                const data = await response.json();
                console.log('Fetched notifications:', data);
                setNotifications(data);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        const fetchAnalytics = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/analytics');
                const data = await response.json();
                console.log('Fetched analytics:', data);
                setAnalytics(data);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            }
        };

        fetchNotifications();
        fetchAnalytics();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: profile?.avatar }}
                    style={styles.avatar}
                    resizeMode="cover"
                />
                <View style={styles.profileView}>
                    <Text style={styles.welcomeText}>Welcome,</Text>
                    <Text style={styles.usernameText}>{profile?.username}</Text>
                </View>
            </View>

            {/* Action Section */}
            <TouchableOpacity style={styles.actionSection} onPress={() => router.push('/MapScreen')}>
                <Image
                    source={{ uri: 'https://picsum.photos/200' }}
                    style={styles.actionImage}
                    resizeMode="cover"
                />
                <Text style={styles.actionTitle}>Explore Maps</Text>
                <Text style={styles.actionDescription}>Discover play areas and plan your visits.</Text>
            </TouchableOpacity>

            {/* Analytics Section */}
            <FlatList
                data={analytics}
                horizontal
                keyExtractor={(item) => item.route}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.summaryCard,
                            { backgroundColor: item.route === 'playground' ? '#28a745' : '#f1c40f' },
                        ]}
                        onPress={() => router.push(`/PlaygroundScreen`)}
                    >
                        <Text style={styles.summaryValue}>{item.count}</Text>
                        <Text style={styles.summaryLabel}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.summaryContainer}
            />

            {/* Notifications Section */}
            <View style={styles.notifications}>
                <Text style={styles.notificationsTitle}>Latest Updates</Text>
                {notifications.length > 0 ? (
                    <FlatList
                        data={notifications}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.notificationItem}>
                                <Text style={styles.notificationText}>{item.message}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.emptyText}>No notifications available</Text>
                )}
            </View>
        </ScrollView>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    profileSection: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    profileView: {
        flexDirection: 'column',
        padding: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    welcomeText: {
        fontSize: 16,
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
    notifications: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    notificationsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 8,
    },
    notificationItem: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    notificationText: {
        fontSize: 14,
        color: '#333',
    },
    summaryContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    summaryCard: {
        width: width * 0.6,
        height: 150,
        padding: 20,
        borderRadius: 8,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    summaryValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    summaryLabel: {
        fontSize: 16,
        color: '#fff',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#757575',
    },
});

import React from 'react';
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

// Styles
const { width } = Dimensions.get('window'); // Get the screen width

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
                <Text style={styles.actionDescription}>Discover play areas and plan your visits.</Text>
            </TouchableOpacity>

            {/* Analytics Section with FlatList */}

            <FlatList
                data={dashboardData.analytics}
                horizontal
                keyExtractor={(item) => item.route}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item.title}
                        style={[styles.summaryCard, , { backgroundColor: item.route === 'playground' ? '#28a745' : '#f1c40f' }]}
                        onPress={() => router.push(`/PlaygroundScreen`)}
                    >

                        <Text style={styles.summaryValue}>{item.count}</Text>
                        <Text style={styles.summaryLabel}>{item.title}</Text>

                    </TouchableOpacity>
                )}

                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.summaryContainer}
            />


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
                <Text style={styles.notificationText}>New PlayUnits coming soon to your area!</Text>
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
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
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
   
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#757575',
    },

    summaryContainer: {
        marginBottom: 20,
        marginTop: 20,
      },
    summaryCard: {
        width: width * 0.7, // Make the card width 70% of the screen width
        height: 150, // Adjust the height to make the card look better
        padding: 20,
        borderRadius: 8,
        marginHorizontal: 10, // Add margin to separate cards
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
});

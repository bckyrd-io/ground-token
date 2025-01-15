import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Base URL for API
const BASE_URL = 'http://192.168.167.40:5000'; // Replace with your current IP address

// Types
interface Playground {
    _id: string;
    name: string;
    description: string;
    image: string;
    location: { latitude: string; longitude: string };
    status: 'Available' | 'Occupied';
    bookingPrice: number;
}

interface ActivityStatus {
    [key: string]: { status: string; position: number };
}

export default function PlaygroundScreen(): JSX.Element {
    const router = useRouter();
    const { playgroundId, paymentStatus } = useLocalSearchParams(); // Capture payment status if passed
    const [playground, setPlayground] = useState<Playground | null>(null);
    const [activityStatus, setActivityStatus] = useState<ActivityStatus>({});
    const [hasPaymentUpdated, setHasPaymentUpdated] = useState(false); // Flag to check if payment was updated

    // Fetch playground details from API
    useEffect(() => {
        const fetchPlayground = async () => {
            try {
                console.log('Fetching playground details...');
                const endpoint = playgroundId
                    ? `${BASE_URL}/api/playgrounds/${playgroundId}` // Fetch specific playground
                    : `${BASE_URL}/api/playgrounds`; // Fetch all playgrounds if no ID

                const response = await fetch(endpoint);
                const data = await response.json();
                console.log('Fetched playground:', data);

                setPlayground(playgroundId ? data : data[0]); // Default to the first playground if no ID
            } catch (error) {
                console.error('Error fetching playground:', error);
                Alert.alert('Error', 'Failed to load playground details.');
            }
        };

        fetchPlayground();
    }, [playgroundId]);

    // Update the playground status if payment is successful and payment hasn't been updated
    useEffect(() => {
        if (paymentStatus === 'Paid' && playground && !hasPaymentUpdated) {
            setPlayground((prevPlayground) => (prevPlayground
                ? { ...prevPlayground, status: 'Occupied' }
                : prevPlayground
            ));
            setActivityStatus((prev) => ({
                ...prev,
                [Array.isArray(playgroundId) ? playgroundId[0] : playgroundId]: { status: 'Paid', position: 1 },
            }));
            
            setHasPaymentUpdated(true); // Set the flag to true to prevent further updates
        }
    }, [paymentStatus, playgroundId, playground, hasPaymentUpdated]);

    const handleBookActivity = (playground: Playground) => {
        const nextPosition = 1; // Placeholder for the queue position
        setActivityStatus((prev) => ({
            ...prev,
            [playground._id]: { status: 'booked', position: nextPosition },
        }));
        // Fixed routing for sending playgroundId
        router.push({
            pathname: '/PaymentScreen',
            params: { playgroundId: playground._id }, // Correct parameter passing
        });
    };

    const resetStatus = (playgroundId: string) => {
        // Reset the status back to "Available" and remove the position
        setActivityStatus((prev) => ({
            ...prev,
            [playgroundId]: { status: 'Available', position: 0 },
        }));
    };

    const getBadgeColor = (status: string) => {
        switch (status) {
            case 'booked':
                return '#FFC107'; // Yellow for booked
            case 'reset':
                return '#757575'; // Grey for reset
            case 'Paid':
                return '#4CAF50'; // Green for Paid
            default:
                return '#E0E0E0'; // Default color
        }
    };

    if (!playground) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Loading playground details...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={[playground]} // Only showing one playground here
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    const status = activityStatus[item._id];
                    return (
                        <View style={styles.card}>
                            <Image source={{ uri: `${BASE_URL}${item.image}` }} style={styles.image} />
                            <View style={styles.cardContent}>
                                <Text style={styles.activityName}>{item.name}</Text>
                                <Text style={styles.activityDescription}>{item.description}</Text>
                                <Text style={styles.activityDetails}>Booking Price: ${item.bookingPrice}</Text>
                                <Text style={styles.activityDetails}>Status: {item.status}</Text>
                                <Text style={styles.activityDetails}>
                                    Location: {item.location.latitude}, {item.location.longitude}
                                </Text>
                                {status && status.status === 'booked' ? (
                                    <View
                                        style={[styles.badge, { backgroundColor: getBadgeColor(status.status) }]} >
                                        <Text style={styles.badgeText}>
                                            {status.status === 'booked'
                                                ? `Position: ${status.position}`
                                                : 'Status Reset'}
                                        </Text>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.bookButton}
                                        onPress={() => handleBookActivity(item)} >
                                        <Text style={styles.bookButtonText}>Book Now</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {status && status.status === 'booked' && (
                                <View style={styles.resetContainer}>
                                    <TouchableOpacity
                                        style={styles.resetButton}
                                        onPress={() => resetStatus(item._id)} >
                                        <Text style={styles.resetButtonText}>Reset</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    );
                }}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    listContainer: {
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 5,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 16,
    },
    activityName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    activityDescription: {
        fontSize: 14,
        color: '#757575',
    },
    activityDetails: {
        fontSize: 14,
        color: '#424242',
        marginVertical: 2,
    },
    badge: {
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    badgeText: {
        color: '#fff',
        fontSize: 14,
    },
    bookButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    resetContainer: {
        marginTop: 10,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    resetButton: {
        backgroundColor: '#f44336',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    errorText: {
        fontSize: 16,
        color: '#f44336',
        textAlign: 'center',
        marginTop: 20,
    },
});

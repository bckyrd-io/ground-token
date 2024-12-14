import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Types
interface Activity {
  id: string;
  name: string;
  description: string;
  image: string;
  currentQueue: number;
  bookingPrice: number; // Price per minute
  maxTimeAllowed: number; // In minutes
  status: 'Available' | 'Occupied';
  location: string;
}

interface PlaygroundDetail {
  id: string;
  name: string;
  activities: Activity[];
}

interface ActivityStatus {
  [key: string]: { status: string; position: number }; // Track status and position for each activity
}

// Sample Data
const playgroundDetails: PlaygroundDetail[] = [
  {
    id: '1',
    name: 'Central Park Playground',
    activities: [
      {
        id: 'a1',
        name: 'Trampoline',
        description: 'Enjoy an exhilarating jump session on our trampoline.',
        image: 'https://picsum.photos/200/300.jpg',
        currentQueue: 5,
        bookingPrice: 2.5,
        maxTimeAllowed: 60,
        status: 'Available',
        location: 'Central Park, NYC',
      },
      {
        id: 'a2',
        name: 'Slide',
        description: 'Slide down the tallest slide for a thrilling experience.',
        image: 'https://picsum.photos/200/300.jpg',
        currentQueue: 3,
        bookingPrice: 1.5,
        maxTimeAllowed: 30,
        status: 'Occupied',
        location: 'Central Park, NYC',
      },
    ],
  },
];

export default function PlaygroundScreen(): JSX.Element {
  const router = useRouter();

  const playground = playgroundDetails.find((item) => item.id === '1');

  // State to track user booking status per activity
  const [activityStatus, setActivityStatus] = useState<ActivityStatus>({});

  if (!playground) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Playground not found</Text>
      </View>
    );
  }

  const handleBookActivity = (activity: Activity) => {
    const nextPosition = activity.currentQueue + 1;
    setActivityStatus((prev) => ({
      ...prev,
      [activity.id]: { status: 'booked', position: nextPosition },
    }));
    router.push(`/payment?activityId=${activity.id}`);
  };

  const resetStatus = (activityId: string) => {
    setActivityStatus((prev) => ({
      ...prev,
      [activityId]: { status: 'reset', position: 0 },
    }));
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'booked':
        return '#4CAF50'; // Green for booked
      case 'reset':
        return '#757575'; // Gray for reset
      default:
        return '#E0E0E0'; // Default gray
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{playground.name}</Text>

      <FlatList
        data={playground.activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const status = activityStatus[item.id];
          return (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.activityName}>{item.name}</Text>
                <Text style={styles.activityDescription}>{item.description}</Text>
                <Text style={styles.queueInfo}>Current Queue: {item.currentQueue}</Text>
                <Text style={styles.activityDetails}>
                  Price: ${item.bookingPrice}/min | Max Time: {item.maxTimeAllowed} mins
                </Text>
                <Text style={styles.activityDetails}>Status: {item.status}</Text>
                <Text style={styles.activityDetails}>Location: {item.location}</Text>
                {status ? (
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: getBadgeColor(status.status) },
                    ]}
                  >
                    <Text style={styles.badgeText}>
                      {status.status === 'booked'
                        ? `Position: ${status.position}`
                        : 'Status Reset'}
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => handleBookActivity(item)}
                  >
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                )}
              </View>
              {status && status.status === 'booked' && (
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={() => resetStatus(item.id)}
                >
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  activityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityDescription: {
    fontSize: 14,
    color: '#757575',
  },
  queueInfo: {
    fontSize: 14,
    color: '#4CAF50',
    marginVertical: 5,
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
  resetButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
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
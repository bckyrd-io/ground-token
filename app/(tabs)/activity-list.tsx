import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Updated import

// Types
interface Activity {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface PlaygroundDetail {
  id: string;
  name: string;
  activities: Activity[];
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
        image: 'https://img.icons8.com/color/96/000000/trampoline.png',
      },
      {
        id: 'a2',
        name: 'Slide',
        description: 'Slide down the tallest slide for a thrilling experience.',
        image: 'https://img.icons8.com/color/96/000000/slide.png',
      },
    ],
  },
  {
    id: '2',
    name: 'Brooklyn Playground',
    activities: [
      {
        id: 'b1',
        name: 'Swing',
        description: 'Soar high into the sky on our swing set.',
        image: 'https://img.icons8.com/color/96/000000/swing.png',
      },
    ],
  },
  {
    id: '3',
    name: 'Queens Adventure Park',
    activities: [
      {
        id: 'q1',
        name: 'Rock Climbing',
        description: 'Challenge yourself with our rock climbing wall.',
        image: 'https://img.icons8.com/color/96/000000/rock-climbing.png',
      },
      {
        id: 'q2',
        name: 'Monkey Bars',
        description: 'Test your strength and agility on the monkey bars.',
        image: 'https://img.icons8.com/color/96/000000/monkey-bars.png',
      },
    ],
  },
];

export default function ActivityListScreen(): JSX.Element {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Replace useSearchParams with useLocalSearchParams

  // Find playground by ID
  const playground = playgroundDetails.find((item) => 1);

  if (!playground) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Playground not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{playground.name}</Text>

      <FlatList
        data={playground.activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.activityName}>{item.name}</Text>
              <Text style={styles.activityDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => alert(`Booked activity: ${item.name}`)}
            >
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
          </View>
        )}
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
    width:200,
    height: 200,
    resizeMode: 'contain',
    marginRight: 10,
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
  bookButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#FF5252',
    textAlign: 'center',
    marginTop: 20,
  },
});

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
import Carousel from 'react-native-snap-carousel';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen(): JSX.Element {
  const router = useRouter();

  // Hardcoded data for testing the Carousel
  const analyticsData = [
    { title: 'Playgrounds', count: 5, route: 'playground' },
    { title: 'Activities', count: 12, route: 'activities' },
    { title: 'Events', count: 8, route: 'events' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Analytics Section with Carousel */}
      <View style={styles.analyticsContainer}>
        <Carousel
          data={analyticsData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.analyticsItem, { backgroundColor: item.route === 'playground' ? '#28a745' : '#f1c40f' }]}
              onPress={() => router.push(`/PlaygroundScreen`)}
            >
              <Text style={styles.analyticsTitle}>{item.title}</Text>
              <Text style={styles.analyticsCount}>{item.count}</Text>
            </TouchableOpacity>
          )}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.7} // Adjust size of each card
          inactiveSlideScale={0.9} // Slightly scale inactive slides
          inactiveSlideOpacity={0.7} // Reduce opacity of inactive slides
        />
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
  analyticsContainer: {
    marginBottom: 24,
  },
  analyticsItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
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
});

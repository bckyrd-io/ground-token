import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Types
interface Playground {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: 'Available' | 'Occupied';
  itemsAvailable: number;
  icon: string; // URL or local asset path for the icon
}

// Sample JSON Data
const playgroundData: Playground[] = [
  {
    id: '1',
    name: 'Central Park Playground',
    latitude: 40.785091,
    longitude: -73.968285,
    status: 'Available',
    itemsAvailable: 5,
    icon: 'https://picsum.photos/200/300.jpg', // Example icon
  },
  {
    id: '2',
    name: 'Brooklyn Playground',
    latitude: 40.678178,
    longitude: -73.944158,
    status: 'Occupied',
    itemsAvailable: 0,
    icon: 'https://picsum.photos/200/300.jpg', // Example icon
  },
  {
    id: '3',
    name: 'Queens Adventure Park',
    latitude: 40.728224,
    longitude: -73.794852,
    status: 'Available',
    itemsAvailable: 8,
    icon: 'https://picsum.photos/200/300.jpg', // Example icon
  },
];

export default function OverviewScreen(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const mapRef = useRef<MapView>(null); // Reference to MapView

  // Filter playgrounds based on search query
  const filteredPlaygrounds = playgroundData.filter((playground) =>
    playground.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Focus on the first matching marker
  const focusOnMarker = () => {
    if (filteredPlaygrounds.length > 0 && mapRef.current) {
      const { latitude, longitude } = filteredPlaygrounds[0];
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search playgrounds..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={focusOnMarker} // Focus the map on the searched marker
        />
      </View>

      {/* Map Section */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 40.785091,
          longitude: -73.968285,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {filteredPlaygrounds.map((playground) => (
          <Marker
            key={playground.id}
            coordinate={{
              latitude: playground.latitude,
              longitude: playground.longitude,
            }}
            title={playground.name}
            description={`${playground.status} - ${playground.itemsAvailable} items available`}
            onCalloutPress={() => router.push(`/activity-list/1`)}
          >
            {/* Custom Marker Icon */}
            <Image
              source={{ uri: playground.icon }}
              style={styles.markerIcon}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  map: {
    width: screenWidth,
    height: screenHeight,
  },
  markerIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

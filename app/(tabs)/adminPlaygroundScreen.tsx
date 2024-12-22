import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import * as Location from 'expo-location';

type Playground = {
  id: string;
  name: string;
  description: string;
  location: { latitude: string; longitude: string };
};

export default function AdminPlayground(): JSX.Element {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [playgrounds, setPlaygrounds] = useState<Playground[]>([]);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  useEffect(() => {
    // Mock playground data (simulating the mock JSON)
    const mockPlaygrounds: Playground[] = [
      {
        id: '1',
        name: 'City Park Playground',
        description: 'A great place for kids to play and enjoy.',
        location: { latitude: '40.748817', longitude: '-73.985428' },
      },
      {
        id: '2',
        name: 'Lakeside Playground',
        description: 'Perfect for families with scenic lake views.',
        location: { latitude: '34.052235', longitude: '-118.243683' },
      },
      {
        id: '3',
        name: 'Mountain View Playground',
        description: 'Ideal for outdoor activities with a mountain backdrop.',
        location: { latitude: '39.739235', longitude: '-104.990250' },
      },
    ];

    setPlaygrounds(mockPlaygrounds);
  }, []);

  const fetchLocation = async () => {
    try {
      setIsFetchingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required to fetch coordinates.');
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: coords.latitude.toFixed(6),
        longitude: coords.longitude.toFixed(6),
      });
    } catch (error) {
      Alert.alert('Error', 'Could not fetch location.');
    } finally {
      setIsFetchingLocation(false);
    }
  };

  const handleAddPlayground = () => {
    if (!name || !description || !location.latitude || !location.longitude) {
      Alert.alert('Incomplete Data', 'Please fill all fields and fetch the GPS location.');
      return;
    }

    const newPlayground: Playground = {
      id: Date.now().toString(),
      name,
      description,
      location,
    };

    setPlaygrounds((prevPlaygrounds) => [...prevPlaygrounds, newPlayground]);

    Alert.alert('Success', 'Playground added successfully!');
    setName('');
    setDescription('');
    setLocation({ latitude: '', longitude: '' });
  };

  const handleDeletePlayground = (id: string) => {
    setPlaygrounds((prevPlaygrounds) =>
      prevPlaygrounds.filter((playground) => playground.id !== id)
    );
    Alert.alert('Deleted', 'Playground has been removed.');
  };

  const renderPlaygroundItem = ({ item }: { item: Playground }) => (
    <View style={styles.playgroundItem}>
      <Text style={styles.playgroundName}>{item.name}</Text>
      <Text style={styles.playgroundDescription}>{item.description}</Text>
      <Text style={styles.playgroundLocation}>
        Latitude: {item.location.latitude}, Longitude: {item.location.longitude}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeletePlayground(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>

      {/* Add Playground Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Playground Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.locationContainer}>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={fetchLocation}
            disabled={isFetchingLocation}
          >
            <Text style={styles.locationButtonText}>
              {isFetchingLocation ? 'Fetching...' : 'Get GPS Location'}
            </Text>
          </TouchableOpacity>
          {location.latitude && location.longitude && (
            <Text style={styles.locationText}>
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPlayground}>
          <Text style={styles.addButtonText}>Add Playground</Text>
        </TouchableOpacity>
      </View>

      {/* List of Playgrounds */}
      <Text style={styles.sectionTitle}>Playground Locations</Text>
      <FlatList
        data={playgrounds}
        keyExtractor={(item) => item.id}
        renderItem={renderPlaygroundItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No playgrounds added yet.</Text>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  locationContainer: {
    marginBottom: 10,
  },
  locationButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  locationText: {
    marginTop: 10,
    fontSize: 14,
    color: '#424242',
  },
  addButton: {
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  playgroundItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  playgroundName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  playgroundDescription: {
    fontSize: 14,
    marginVertical: 5,
  },
  playgroundLocation: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#757575',
  },
});

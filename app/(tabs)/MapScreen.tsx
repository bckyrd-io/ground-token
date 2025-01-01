import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Base URL for API
const BASE_URL = 'http://192.168.71.40:5000'; // Replace with current IP address

// Types
interface Playground {
    _id: string;
    name: string;
    location: { latitude: number; longitude: number };
    status?: 'Available' | 'Occupied';
    itemsAvailable?: number;
    image?: string; // URL for the image
}

export default function OverviewScreen(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState('');
    const [playgrounds, setPlaygrounds] = useState<Playground[]>([]);
    const [filteredPlaygrounds, setFilteredPlaygrounds] = useState<Playground[]>([]);
    const router = useRouter();
    const mapRef = useRef<MapView>(null); // Reference to MapView

    // Fetch playgrounds from API
    useEffect(() => {
        const fetchPlaygrounds = async () => {
            try {
                console.log('Fetching playgrounds...');
                const response = await fetch(`${BASE_URL}/api/playgrounds`);
                const data = await response.json();
                console.log('Fetched playgrounds:', data);

                // Parse latitude and longitude to numbers
                const parsedData = data.map((playground: Playground) => ({
                    ...playground,
                    location: {
                        latitude: Number(playground.location.latitude),
                        longitude: Number(playground.location.longitude),
                    },
                    image: `${BASE_URL}${playground.image}` // Use server image directly
                }));

                console.log('Parsed playgrounds:', parsedData);
                setPlaygrounds(parsedData);
                setFilteredPlaygrounds(parsedData);
            } catch (error) {
                console.error('Error fetching playgrounds:', error);
                Alert.alert('Error', 'Failed to load playgrounds.');
            }
        };

        fetchPlaygrounds();
    }, []);

    // Filter playgrounds based on search query
    useEffect(() => {
        console.log('Filtering playgrounds with query:', searchQuery);
        const results = playgrounds.filter((playground) =>
            playground.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log('Filtered playgrounds:', results);
        setFilteredPlaygrounds(results);
    }, [searchQuery, playgrounds]);

    // Focus on the first matching marker
    const focusOnMarker = () => {
        if (filteredPlaygrounds.length > 0 && mapRef.current) {
            const { latitude, longitude } = filteredPlaygrounds[0].location;
            console.log('Focusing on marker at:', latitude, longitude);
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
                    latitude: -16.008213, // Default to first playground's lat/lng if available
                    longitude: 35.305639,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {filteredPlaygrounds.map((playground) => (
                    <Marker
                        key={playground._id}
                        coordinate={{
                            latitude: playground.location.latitude,
                            longitude: playground.location.longitude,
                        }}
                        title={playground.name}
                        description={`${playground.status || 'Available'} - ${playground.itemsAvailable || 0} items available`}
                    >
                        {/* Custom Marker Image */}
                        {playground.image && (
                            <Image
                                source={{ uri: playground.image }}
                                style={{ width: 100, height: 100, resizeMode: 'contain' }}
                            />
                        )}
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
        borderColor: '#FFC107',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    map: {
        width: screenWidth,
        height: screenHeight,
    },
});

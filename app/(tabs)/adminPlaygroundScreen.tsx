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
    Image,
} from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

type Playground = {
    _id: string;
    name: string;
    description: string;
    location: { latitude: string; longitude: string };
    image?: string;
};

export default function AdminPlayground(): JSX.Element {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState({ latitude: '', longitude: '' });
    const [playgrounds, setPlaygrounds] = useState<Playground[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);

    useEffect(() => {
        fetchPlaygrounds();
    }, []);

    const fetchPlaygrounds = async () => {
        try {
            const response = await fetch('http://192.168.12.40:5000/api/playgrounds');
            const data = await response.json();
            setPlaygrounds(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch playgrounds.');
        }
    };

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

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Ensure the image is cropped to a square
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleAddPlayground = async () => {
        if (!name || !description || !location.latitude || !location.longitude || !image) {
            Alert.alert('Incomplete Data', 'Please fill all fields, fetch GPS location, and add an image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('latitude', location.latitude);
        formData.append('longitude', location.longitude);

        const file = {
            uri: image,
            name: `playground_${Date.now()}.jpg`,
            type: 'image/jpeg',
        };
        formData.append('image', file as any);

        try {
            const response = await fetch('http://192.168.12.40:5000/api/playgrounds', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                Alert.alert('Success', 'Playground added successfully!');
                fetchPlaygrounds(); // Refresh data
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.error || 'Failed to add playground.');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error. Please try again.');
        }
    };

    const handleDeletePlayground = async (id: string) => {
        try {
            const response = await fetch(`http://192.168.12.40:5000/api/playgrounds/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                Alert.alert('Deleted', 'Playground has been removed.');
                fetchPlaygrounds(); // Refresh data
            } else {
                Alert.alert('Error', 'Failed to delete playground.');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error. Please try again.');
        }
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
                onPress={() => handleDeletePlayground(item._id)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
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
                {/* Image Picker */}
                <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Text style={styles.placeholderText}>Select Image</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Location Button */}
                <TouchableOpacity
                    style={styles.locationButton}
                    onPress={fetchLocation}
                    disabled={isFetchingLocation}
                >
                    <Text style={styles.locationButtonText}>
                        {isFetchingLocation ? 'Fetching...' : location.latitude ? `${location.latitude}, ${location.longitude}` : 'Get GPS Location'}
                    </Text>
                </TouchableOpacity>

                {/* Add Playground Button */}
                <TouchableOpacity style={styles.addButton} onPress={handleAddPlayground}>
                    <Text style={styles.addButtonText}>Add Playground</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={playgrounds}
                keyExtractor={(item) => item._id}
                renderItem={renderPlaygroundItem}
                contentContainerStyle={styles.listContainer}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imagePickerButton: {
        width: '100%',
        height: 150,
        borderStyle: 'dotted',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    placeholderImage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    placeholderText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
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
    locationButton: {
        borderColor: '#FFC107',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        marginTop: 10,
    },
    locationButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
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
});

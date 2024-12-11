import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

export default function StatusScreen(): JSX.Element {
  const router = useRouter();

  // Mock statuses for demonstration
  const statuses = [
    {
      id: 1,
      message: 'Trampoline booking confirmed.',
      type: 'Booking',
      status: 'Completed',
      timestamp: '2024-12-11 10:00 AM',
    },
    {
      id: 2,
      message: 'Slide booking pending payment.',
      type: 'Booking',
      status: 'Pending',
      timestamp: '2024-12-11 10:05 AM',
    },
    {
      id: 3,
      message: 'Payment failed for Trampoline.',
      type: 'Payment',
      status: 'Failed',
      timestamp: '2024-12-11 10:15 AM',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#4CAF50'; // Green for completed
      case 'Pending':
        return '#FFC107'; // Yellow for pending
      case 'Failed':
        return '#F44336'; // Red for failed
      default:
        return '#E0E0E0'; // Default gray
    }
  };

  const navigateToDetails = (statusId: number) => {
    alert(`Navigating to details for status ID: ${statusId}`);
    // You can use router.push to navigate to a detailed status view
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Status Monitoring</Text>
      <FlatList
        data={statuses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.statusItem, { backgroundColor: getStatusColor(item.status) }]}
            onPress={() => navigateToDetails(item.id)}
          >
            <Text style={styles.statusMessage}>{item.message}</Text>
            <Text style={styles.statusType}>Type: {item.type}</Text>
            <Text style={styles.statusTimestamp}>{item.timestamp}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.statusList}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/playground')}>
        <Text style={styles.backButtonText}>Go Back to Playground</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusList: {
    paddingBottom: 20,
  },
  statusItem: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  statusMessage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  statusType: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  statusTimestamp: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  backButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
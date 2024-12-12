import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

// Types
type Activity = {
  id: string;
  message: string;
  timestamp: string;
};

type SummaryItem = {
  label: string;
  value: string | number;
  color: string;
};

// Component
export default function AdminDashboard(): JSX.Element {
  // Mock Data
  const usageData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [10, 15, 25, 20, 35, 50, 30],
        color: () => '#4CAF50', // Bar color
      },
    ],
  };

  const recentActivities: Activity[] = [
    { id: '1', message: 'John Doe booked Trampoline', timestamp: '2024-12-10' },
    { id: '2', message: 'Jane Smith completed payment', timestamp: '2024-12-11' },
    { id: '3', message: 'Bob Johnson updated account status', timestamp: '2024-12-11' },
  ];

  const summaryData: SummaryItem[] = [
    { label: 'Total Users', value: 150, color: '#2196F3' },
    { label: 'Active Users', value: 120, color: '#4CAF50' },
    { label: 'Total Revenue', value: '$12,500', color: '#FFC107' },
    { label: 'Pending Payments', value: 8, color: '#F44336' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        {summaryData.map((item) => (
          <View
            key={item.label}
            style={[styles.summaryCard, { backgroundColor: item.color }]}
          >
            <Text style={styles.summaryValue}>{item.value}</Text>
            <Text style={styles.summaryLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Usage Data Graph */}
      <View style={styles.graphContainer}>
        <Text style={styles.sectionTitle}>Weekly Usage</Text>
        <BarChart
          data={usageData}
          width={350}
          height={220}
          yAxisLabel=""
          yAxisSuffix=" users"
          chartConfig={{
            backgroundColor: '#f9f9f9',
            backgroundGradientFrom: '#f9f9f9',
            backgroundGradientTo: '#f9f9f9',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 8 },
          }}
          style={styles.chart}
        />
      </View>

      {/* Recent Activities */}
      <View style={styles.activitiesContainer}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <FlatList
          data={recentActivities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.activityCard}>
              <Text style={styles.activityMessage}>{item.message}</Text>
              <Text style={styles.activityTimestamp}>{item.timestamp}</Text>
            </View>
          )}
          contentContainerStyle={styles.activityList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No recent activities.</Text>
          }
        />
      </View>

      {/* Manage Buttons */}
      <View style={styles.manageContainer}>
        <TouchableOpacity style={styles.manageButton}>
          <Text style={styles.manageButtonText}>Manage Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.manageButton}>
          <Text style={styles.manageButtonText}>Manage Playgrounds</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#fff',
  },
  graphContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 8,
  },
  activitiesContainer: {
    marginBottom: 20,
  },
  activityList: {
    paddingBottom: 20,
  },
  activityCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activityMessage: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  activityTimestamp: {
    fontSize: 14,
    color: '#757575',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#757575',
  },
  manageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  manageButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  manageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

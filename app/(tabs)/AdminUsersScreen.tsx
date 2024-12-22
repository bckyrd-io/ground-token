import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

type User = {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  pendingPayment: boolean;
};

export default function AdminUsersScreen(): JSX.Element {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'Active', pendingPayment: true },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', pendingPayment: false },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', pendingPayment: true },
  ]);

  const [filter, setFilter] = useState<'All' | 'Active' | 'Inactive' | 'Pending Payment'>('All');

  const confirmPayment = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, pendingPayment: false } : user
      )
    );
    Alert.alert('Payment Confirmed', 'The payment has been successfully confirmed.');
  };

  const updateUserStatus = (userId: string, newStatus: 'Active' | 'Inactive') => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    Alert.alert('Status Updated', `User status has been updated to ${newStatus}.`);
  };

  const deleteUser = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    Alert.alert('User Deleted', 'The user has been removed from the system.');
  };

  const renderUserActions = (user: User) => (
    <View style={styles.actionsContainer}>
      {user.pendingPayment && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => confirmPayment(user.id)}
        >
          <Text style={styles.actionText}>Confirm Payment</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() =>
          updateUserStatus(
            user.id,
            user.status === 'Active' ? 'Inactive' : 'Active'
          )
        }
      >
        <Text style={styles.actionText}>
          Set {user.status === 'Active' ? 'Inactive' : 'Active'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteUser(user.id)}
      >
        <Text style={styles.actionText}>Delete User</Text>
      </TouchableOpacity>
    </View>
  );

  const applyFilter = (): User[] => {
    if (filter === 'All') return users;
    if (filter === 'Pending Payment') return users.filter((user) => user.pendingPayment);
    return users.filter((user) => user.status === filter);
  };

  return (
    <View style={styles.container}>

      {/* Filters */}
      <View style={styles.filters}>
        {['All', 'Active', 'Inactive', 'Pending Payment'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterButton,
              filter === f && styles.activeFilterButton,
            ]}
            onPress={() => setFilter(f as 'All' | 'Active' | 'Inactive' | 'Pending Payment')}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.activeFilterText,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* User List */}
      <FlatList
        data={applyFilter()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <Text style={styles.userStatus}>Status: {item.status}</Text>
            {renderUserActions(item)}
          </View>
        )}
        contentContainerStyle={styles.userList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users to display.</Text>
        }
      />
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
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  activeFilterButton: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#fff',
  },
  userList: {
    paddingBottom: 20,
  },
  userCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 5,
    color: '#757575',
  },
  userStatus: {
    fontSize: 14,
    marginBottom: 10,
    color: '#424242',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#757575',
  },
});

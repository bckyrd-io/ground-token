import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Updated import

// Sample Payment Methods
const paymentMethods = [
  { id: '1', name: 'Credit/Debit Card' },
  { id: '2', name: 'Wallet' },
  { id: '3', name: 'Offline Payment' },
];

export default function PaymentScreen(): JSX.Element {
  const router = useRouter();
  const { activityId } = useLocalSearchParams(); // Updated usage

  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [cardNumber, setCardNumber] = useState('');
  const [walletBalance, setWalletBalance] = useState(50); // Mock wallet balance
  const [offlineStatus, setOfflineStatus] = useState(false);

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    if (selectedMethod === '1' && cardNumber === '') {
      alert('Please enter your card details');
      return;
    }

    if (selectedMethod === '2' && walletBalance < 10) { // Mock minimum amount
      alert('Insufficient wallet balance');
      return;
    }

    if (selectedMethod === '3') {
      setOfflineStatus(true);
      alert('Admin will confirm offline payment.');
      return;
    }

    alert('Payment successful! Redirecting...');
    router.push('/status');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.subHeader}>Select Payment Method</Text>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.paymentMethod,
            selectedMethod === method.id && styles.selectedPaymentMethod,
          ]}
          onPress={() => setSelectedMethod(method.id)}
        >
          <Text style={styles.paymentMethodText}>{method.name}</Text>
        </TouchableOpacity>
      ))}

      {selectedMethod === '1' && (
        <TextInput
          style={styles.input}
          placeholder="Enter Card Number"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      )}

      {selectedMethod === '2' && (
        <Text style={styles.walletInfo}>
          Wallet Balance: ${walletBalance}
        </Text>
      )}

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Confirm Payment</Text>
      </TouchableOpacity>

      {offlineStatus && (
        <Text style={styles.offlineStatus}>Waiting for Admin Confirmation...</Text>
      )}
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
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  paymentMethod: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedPaymentMethod: {
    backgroundColor: '#FFC107',
  },
  paymentMethodText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
  },
  walletInfo: {
    fontSize: 16,
    marginBottom: 20,
    color: '#424242',
  },
  paymentButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  offlineStatus: {
    marginTop: 20,
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
  },
});

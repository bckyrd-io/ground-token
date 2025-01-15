import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Base URL for API
const BASE_URL = 'http://192.168.167.40:5000'; // Replace with your current IP address

// Payment Methods
const paymentMethods = [
    { id: '1', name: 'Credit/Debit Card' },
    { id: '2', name: 'Wallet' },
    { id: '3', name: 'Offline Payment' },
];

export default function PaymentScreen(): JSX.Element {
    const router = useRouter();
    const { playgroundId } = useLocalSearchParams(); // Capture playground ID from params

    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [cardNumber, setCardNumber] = useState('');
    const [walletBalance, setWalletBalance] = useState(50); // Mock wallet balance
    const [offlineStatus, setOfflineStatus] = useState(false);
    const [playground, setPlayground] = useState<any>(null);

    // Fetch playground details
    useEffect(() => {
        const fetchPlayground = async () => {
            try {
                console.log('Fetching playground details for payment...', `${BASE_URL}/api/playgrounds/${playgroundId}`);
                const response = await fetch(`${BASE_URL}/api/playgrounds/${playgroundId}`);
                const data = await response.json();
                console.log('Fetched playground details:', data);
                setPlayground(data);
            } catch (error) {
                console.error('Error fetching playground:', error);
                Alert.alert('Error', 'Failed to load playground details.');
            }
        };

        fetchPlayground();
    }, [playgroundId]);


    const handlePayment = async () => {
        if (!selectedMethod) {
            Alert.alert('Error', 'Please select a payment method');
            return;
        }

        if (selectedMethod === '1' && cardNumber === '') {
            Alert.alert('Error', 'Please enter your card details');
            return;
        }

        if (selectedMethod === '2' && walletBalance < playground.bookingPrice) {
            Alert.alert('Error', 'Insufficient wallet balance');
            return;
        }

        try {
            const paymentData = {
                method: paymentMethods.find((m) => m.id === selectedMethod)?.name,
                amount: playground.bookingPrice,
                status: 'Completed',
            };

            console.log('Booking playground...', `${BASE_URL}/api/payments/book/${playgroundId}`);
            const response = await fetch(`${BASE_URL}/api/payments/book/${playgroundId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Payment Successful', 'Playground booked successfully!');
                // Pass the updated status and payment information back to PlaygroundScreen
                router.push({
                    pathname: '/PlaygroundScreen',
                    params: { playgroundId: playgroundId, paymentStatus: 'Paid' },
                });
            } else {
                Alert.alert('Payment Failed', result.error || 'Failed to process payment.');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            Alert.alert('Error', 'Failed to process payment.');
        }
    };




    if (!playground) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading playground details...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Payment for {playground.name}</Text>
            <Text style={styles.subHeader}>Price: ${playground.bookingPrice}</Text>

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
                <Text style={styles.walletInfo}>Wallet Balance: ${walletBalance}</Text>
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
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

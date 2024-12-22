import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type PasswordRecoveryData = {
  email: string;
};

export default function PasswordRecoveryScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<PasswordRecoveryData>({ email: '' });

  const handleChange = (key: keyof PasswordRecoveryData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handlePasswordReset = () => {
    if (!formData.email) {
      alert('Please enter your email address.');
      return;
    }
    // Handle password recovery logic here
    console.log('Password Recovery Data:', formData);
    alert('A password reset link has been sent to your email address.');
    router.push('/LoginScreen');
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        value={formData.email}
        keyboardType="email-address"
        onChangeText={(text) => handleChange('email', text)}
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => router.push('/LoginScreen')}>
        Back to Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '98%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    width: '98%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#FFC107',
    marginTop: 12,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

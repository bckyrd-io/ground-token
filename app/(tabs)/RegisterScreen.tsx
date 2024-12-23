import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';

type RegistrationData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  whatsapp?: string;
  address?: string;
  agreeToTerms: boolean;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    whatsapp: '',
    address: '',
    agreeToTerms: false,
  });

  const handleChange = (key: keyof RegistrationData, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!formData.agreeToTerms) {
      alert('You must agree to the terms and conditions.');
      return;
    }
    // Send formData to backend here
    console.log('Registration Data:', formData);
    router.push('/LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        keyboardType="email-address"
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        secureTextEntry
        onChangeText={(text) => handleChange('password', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        secureTextEntry
        onChangeText={(text) => handleChange('confirmPassword', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="WhatsApp Contact (Optional)"
        value={formData.whatsapp}
        keyboardType="phone-pad"
        onChangeText={(text) => handleChange('whatsapp', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address Location (Optional)"
        value={formData.address}
        onChangeText={(text) => handleChange('address', text)}
      />

      <View style={styles.switchContainer}>
        <Switch
          value={formData.agreeToTerms}
          onValueChange={(value) => handleChange('agreeToTerms', value)}
        />
        <Text style={styles.switchLabel}>I agree to Terms and Conditions</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    marginLeft: 8,
    fontSize: 16,
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
    color: '#4CAF50',
    marginTop: 12,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

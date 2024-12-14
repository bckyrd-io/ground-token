import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email/Username" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#888" />
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Create an Account
      </Text>
      <Text style={styles.link} onPress={() => navigation.navigate('PasswordRecovery')}>
        Forgot Password?
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
    color: '#4CAF50',
    marginTop: 12,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

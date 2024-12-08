import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email/Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={() => navigation.navigate('Dashboard')} />
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '98%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    borderRadius: 8,
  },
  link: {
    color: '#007BFF',
    marginTop: 12,
    textDecorationLine: 'underline',
  },
});

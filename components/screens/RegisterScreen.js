import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AuthContext from '../globalContext/globalContext';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //destructuring the register function from the authcontext...
  const { register } = useContext(AuthContext);

  //function to handle registering user...
  const handleRegister = async () => {
    try {
      await register(username, email, password);
      Alert.alert('Registration Successful', 'You can now log in.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration Failed', error.response.data.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center', // Center horizontally
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%', // Adjust width for better centering
  },
  buttonContainer: {
    width: '80%', // Adjust width for better centering
    marginTop: 10,
    marginBottom: 10,
  },
});

export default RegisterScreen;

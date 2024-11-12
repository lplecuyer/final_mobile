import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [token, setToken] = useState('');

  const Login = () => {
    // Handle sign-up logic here
    console.log({ username, password, passwordConfirmation, token });
  };

  return (
    <View style={styles.background}>
      <Text style={styles.bigText}>SignUp</Text>
      <Text style={styles.smallText}>Username</Text>
      <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.smallText}>Password</Text>
      <TextInput
        style={styles.textInput}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.smallText}>Password Confirmation</Text>
      <TextInput
        style={styles.textInput}
        secureTextEntry
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
      />
      <Text style={styles.smallText}>Token</Text>
      <TextInput
        style={styles.textInput}
        value={token}
        onChangeText={setToken}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={Login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#343C53',
    flex: 1,
    alignItems: 'center',
  },
  bigText: {
    color: '#C5C3C0',
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    marginTop: 10,
  },
  smallText: {
    color: '#B1B1AE',
    marginTop: 25,
    fontSize: 20,
    width: '50%',
    textAlign: 'left',
  },
  textInput: {
    height: 35,
    width: '50%',
    backgroundColor: '#27516C',
    borderColor: '#2a498c',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 30,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#4BB50D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#B5FA74',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

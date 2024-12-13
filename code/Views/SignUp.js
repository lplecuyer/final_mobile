import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import AuthService from'../authentification/AuthService.js'



export default function SignUp({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [token, setToken] = useState('');
  const [steam_id, setSteamId] = useState('');

  const handleSignUp = () => {
    if (password !== passwordConfirmation) {
      alert('Passwords do not match!');
      return;
    }

    const credentials = { username, password, token, steam_id };

    const isSignedUp = AuthService.signUp(credentials);

    if (isSignedUp) {
      alert('Sign up successful!');
      navigation.navigate('MainMenu');
    } else {
      alert('Sign up failed! Username might already be taken.');
    }
  };
  return (
    <ScrollView>
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
      <Text style={styles.smallText}>Steam Id</Text>
      <TextInput
        style={styles.textInput}
        value={steam_id}
        onChangeText={setSteamId}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleSignUp()} >
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
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
    marginTop: 25,
  },
  smallText: {
    color: '#B1B1AE',
    marginTop: 50,
    fontSize: 20,
    width: '50%',
    textAlign: 'left',
  },
  textInput: {
    height: 40,
    width: '50%',
    backgroundColor: '#27516C',
    borderColor: '#2a498c',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 50,
    borderRadius: 50,
  },
  button: {
    backgroundColor: '#4BB50D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 25,
  },
  buttonText: {
    color: '#B5FA74',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

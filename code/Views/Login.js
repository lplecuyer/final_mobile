import React, { useState } from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import AuthService from '../authentification/AuthService';


export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = async () => {
    const credentials = {username, password}
        try {
            const result = await AuthService.logIn(credentials);
            if (result != null) {
              navigation.navigate('GamesList');
            }
        } catch (error) {
            console.error('Erreur lors de l’appel API:', error);
            console.log('Erreur', 'Impossible de récupérer les informations utilisateur.');
        }
    };
  return (
    <View style={styles.background}>
      <Text style={styles.bigText}>Login</Text>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
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
    marginTop: 25,
  },
  smallText: {
    color: '#B1B1AE',
    marginRight: 100,
    marginTop: 50,
    fontSize: 20,
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
  },
  buttonText: {
    color: '#B5FA74',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
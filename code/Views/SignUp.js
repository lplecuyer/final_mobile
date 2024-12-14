import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message'; // Import de Toast
import AuthService from '../authentification/AuthService.js';
import ShtweamService from '../Services/SteamService.js';

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [token, setToken] = useState('');
  const [steam_id, setSteamId] = useState('');

  const handleSignUp = async () => {
    if (username.length <= 0) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur',
        text2: 'Votre nom ne doit pas être vide.',
      });
      return;
    }

    if (password.length < 4) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur',
        text2: 'Votre mot de passe doit contenir au minimum 4 caractères.',
      });
      return;
    }

    if (password !== passwordConfirmation) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur',
        text2: 'Les mots de passe ne correspondent pas.',
      });
      return;
    }

    try {
      const user_check = { steam_id, token };
      const userExists = await ShtweamService.GetUser(user_check);
      if (!userExists) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Erreur',
          text2: 'Le compte Steam est inexistant.',
        });
        return;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur API',
        text2: `Erreur lors de l'appel API: soit la clé d'API ou le Steam_id est invalide`,
      });
      return;
    }

    const credentials = { username, password, token, steam_id };

    const isSignedUp = await AuthService.signUp(credentials);

    if (isSignedUp) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Succès',
        text2: 'Inscription réussie!',
      });
      navigation.navigate('MainMenu');
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur',
        text2: "Un problème s'est produit.",
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.background}>
        <Text style={styles.bigText}>Inscription</Text>
        <Text style={styles.smallText}>Nom d'utilisateur</Text>
        <TextInput
          style={styles.textInput}
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.smallText}>Mot de passe</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.smallText}>Confirmation de mot de passe</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
        />
        <Text style={styles.smallText}>Clé API</Text>
        <TextInput
          style={styles.textInput}
          value={token}
          onChangeText={setToken}
        />
        <Text style={styles.smallText}>Id de votre compte Steam</Text>
        <TextInput
          style={styles.textInput}
          value={steam_id}
          onChangeText={setSteamId}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
            <Text style={styles.buttonText}>S'inscrire</Text>
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

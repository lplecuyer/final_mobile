import React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';

export default function Login() {
  return (
    <View style={styles.background}>
      <Text style={styles.bigText}>Login</Text>
      <Text style={styles.smallText}>Username</Text>
      <TextInput style={styles.textInput}></TextInput>
      <Text style={styles.smallText}>Password</Text>
      <TextInput style={styles.textInput}></TextInput>
      <View style={styles.buttonContainer}>
        <Button color = '#63C319' title='Login'/>
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
  },
});
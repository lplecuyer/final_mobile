import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import BaseTemplate from './BaseTemplate';

export default function UserMenu() {

  return (
    <View style={styles.background}>
      <BaseTemplate />
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
  }
});

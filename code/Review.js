import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
const numbers = [...Array(5)]
export default function Review() {
  return (
    <View style={styles.background}>
        <View style={styles.reviewcontainer}>
            <Text style={styles.bigText}>Ce jeux est le pire que j'ai jamais joué</Text>
            <Text style={styles.smallText}>reviewreviewreviewreviewreview</Text>
        </View>
        <FlatList
            data={ numbers }
            renderItem={ () => {
                return (
                <View style={styles.commentcontainer}>
                    <Text style={styles.smallText}>Tu n'as pas raison, t'est une grosse merde et tu mérite de mourrir pour avoir dit ça</Text>
                </View>
                )
            }}
        />
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
    fontSize: 35,
    alignContent: 'center',
    marginTop: 25,
  },
  smallText: {
    color: '#B1B1AE',
    marginRight: 100,
    marginTop: 50,
    fontSize: 20,
  },
  reviewcontainer: {
    backgroundColor: 'grey',
    width: '90%',
    marginTop: 10,
    elevation: 40,
  },
  commentcontainer: {
    backgroundColor: 'grey',
    width: '90%',
    marginTop: 10,
    elevation: 40,
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
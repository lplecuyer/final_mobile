import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image, FlatList } from 'react-native';

const gameNumbers = [...Array(10)]
const reviewNumbers = [...Array(50)]
export default function UserMenu() {

  return (
    <View style={styles.background}>
      <View style={styles.menucontainer}>

        <View style={styles.userContainer}>
          <View style={styles.logoContainer}>
            <Image source={require('./assets/User_Icon.png')} style={styles.logo} />
          </View>
          <Text style={styles.smallText}>Username</Text>
          <Text style={styles.smallText}>Level</Text>
          <Text style={styles.smallText}>Achievement</Text>
        </View>
        
        <View style={styles.reviewContainerContainer}>
          <Text style={[styles.smallText, { marginLeft: 0 }]}>Reviews</Text>
            <View style={styles.reviewContainer}>
              <FlatList numColumns={2}
              data={ reviewNumbers }
                renderItem={ () => {
                  return (
                    <Image source={require('./assets/User_Icon.png')} style={styles.review} />
                  )
                }}
              />
            </View>
        </View>
      </View>

      <Text style={styles.bigText}>My Games</Text>

      <FlatList style={styles.gameList}
      data={ gameNumbers }
            renderItem={ () => {
                return (
                <View style={styles.gameContainer}>
                  <Image source={require('./assets/User_Icon.png')} style={styles.gameIcon} />
                  <Text style={styles.smallText}>Game name</Text>
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
    fontSize: 50,
    textAlign: 'center',
    marginTop: 10,
  },
  smallText: {
    color: '#B1B1AE',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
    width: '50%',
    textAlign: 'left',
    flexShrink: 1,
    width: 'auto',
  },
  menucontainer: {
    backgroundColor: '#121315',
    width: '100%',
    height: '40%',
    elevation: 30,
    justifyContent: "flex-start",
    flexDirection: 'row',
  },
  logoContainer: {
    justifyContent: "flex-start",
    flexDirection: 'row',
    top: 10,
  },
  logo: {
    width: 100,
    height: 100,
    left: 10,
  },
  userContainer:{
    width: '40%',
  },
  reviewContainer:
  {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: '80%',
  },
  review: {
    width: 90,
    height: 40,
    marginTop: 10,
    marginRight: 10,
  },
  reviewContainerContainer:
  {
    width: '60%',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  gameContainer: {
    backgroundColor: '#535353',
    width: '400%',
    height: 60,
    justifyContent: "flex-start",
    flexDirection: 'row',
    top: 10,
    marginBottom: 10,
  },
  gameIcon: {
    marginLeft: 10,
    margin: 7,
    height: 'auto',
  },
  gameList: {
    width: '90%'
  }
});

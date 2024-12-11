import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import styles from '../assets/styles.js';


export default function UserToken({navigation}) {
    return (
        <ScrollView style={{ backgroundColor: '#343C53', flex: 1 }}>
            <View style={{justifyContent: 'flex-start', alignItems: 'center', }}>
                <Text style={ styles.title }>
                    How to get your Steam User Token
                </Text>
                <View style={{ height: 10, width: "80%", borderWidth: 3, borderBlockColor: '#B1B1AE' }} />

                <View style={{flexGrow: 1, marginTop: 80}}>

                    <Text style={styles.tinytext}>Step 1: Connect to your Steam account</Text>
                    <Image source={require("../assets/how_to_connect.png")} style={{width: 400, height: 200, marginTop: 20}} resizeMode="contain"/>

                    <View style={styles.separator} />

                    <Text style={styles.tinytext}>Step 2: go to https://steamcommunity.com/dev/apikey and enter the form, you will be prompted for a domain name, just type localhost or any name and it should be fine</Text>

                    <View style={styles.separator} />

                    <Text style={styles.tinytext}>Step 3: You might also need to activate the steam Authenticator on your mobile device and set up the 2FA</Text>
                    <Text style={[styles.tinytext, {marginTop: 10}]}>Once this is done, the api webpage will ask for an authorization to your Authenticator. On your mobile device, juste press the 3 lines in the bottom right and access notifications</Text>
                    <Image source={require("../assets/authenticator notifs.png")} style={{width: 400, height: 200, marginTop: 20, marginBottom: 20}} resizeMode="contain"/>

                </View>
            </View>
        </ScrollView>
    );
}

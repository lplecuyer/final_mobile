import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import BaseTemplate from './BaseTemplate.js';
import styles from './assets/styles.js';


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
                        <Image source={require("./assets/how_to_connect.png")} style={{width: 400, height: 200, marginTop: 20}} resizeMode="contain"/>
                    </View>
                </View>
            </ScrollView>
    );
}

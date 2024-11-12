import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './assets/styles.js';

export default function BaseTemplate({ children}) {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ borderWidth: 10, flexGrow: 1}}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <View style={[styles.header, {elevation: 10}]}>
                <TouchableOpacity  onPress={() => navigation.navigate('Main menu')}>
                    <Image source={require('./assets/steam_bird.png')} style={styles.logo}/>
                </TouchableOpacity>
                <Text style={{ fontSize: 36, textAlign: 'left', color: '#9B9B9B', fontWeight: 'bold', flex: 1, marginLeft: '10%' }}>
                    Shtweam
                </Text>
            </View>
            <View style={{flexGrow: 1}}>
                {children}
            </View>
        </SafeAreaView>
    );
}
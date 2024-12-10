import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './assets/styles.js';

export default function NavigationTemplate({children}) {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{width: '100%'}}>
            <View style={styles.navigationContainer}>
                <TouchableOpacity  onPress={() => navigation.navigate('GamesList')}>
                    <Image source={require('./assets/Game_list.png')} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('Login')}>
                    <Image source={require('./assets/Discover.png')} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('User')}>
                    <Image source={require('./assets/User.png')} style={styles.icon}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
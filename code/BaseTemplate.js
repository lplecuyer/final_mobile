import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text } from 'react-native';
import styles from './assets/styles.js';


function BaseTemplate() {
    return (
        <SafeAreaView style={ styles.safeArea }>
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
        <View style={ styles.header }>
            <Image source={require('./assets/steam_bird.png')} style={styles.logo} />
            <Text style={{ fontSize: 36, textAlign: 'left', color: '#9B9B9B',fontWeight: 'bold', flex: 1, marginLeft: '10%' }}>
                Shtweam
            </Text>
        </View>
        <View style={ styles.background }>

        </View>
        </SafeAreaView>
    )
}

export default BaseTemplate;
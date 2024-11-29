import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './assets/styles.js';

export default function MainMenu({navigation}) {

    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#343C53', flex: 1 }}>
            <Text style={ styles.title }>
                Welcome to Shtweam
            </Text>
            <View style={styles.menucontainer}> 
                <Text style={[styles.tinytext, {marginTop: 20}]}>
                    Login or sign up to access a variety of reviews and comments on your favourite games!
                </Text>

                <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10, width: "60%", marginTop: 20}}>
                    <TouchableOpacity style={styles.ButtonMenu} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.textButtonMenu}>Sign up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ButtonMenu} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.textButtonMenu}>Login</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.ButtonMenu} onPress={() => navigation.navigate('User token')}>
                    <Text style={styles.textButtonMenu}>How to get your steam User Token</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

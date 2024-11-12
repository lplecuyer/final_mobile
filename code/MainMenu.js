import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './assets/styles.js';

export default function MainMenu() {
    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#343C53', flex: 1 }}>
            <Text style={ styles.title }>
                Welcome to Shtweam
            </Text>
            <View style={styles.menucontainer}> 
                <Text style={styles.tinytext}>
                    Login or sign up to access a variety of reviews and comments on your favourite games!
                </Text>

                <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10, width: "60%"}}>
                    <TouchableOpacity style={styles.ButtonMenu}>
                        <Text style={styles.textButtonMenu}>Sign up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ButtonMenu}>
                        <Text style={styles.textButtonMenu}>Login</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.ButtonMenu}>
                    <Text style={styles.textButtonMenu}>How to get your Steam User Token</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

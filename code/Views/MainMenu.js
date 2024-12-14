import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/styles.js';

export default function MainMenu({navigation}) {

    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#343C53', flex: 1 }}>
            <Text style={ styles.title }>
                Bienvenue sur Shtweam
            </Text>
            <View style={styles.menucontainer}> 
                <Text style={[styles.tinytext, {marginTop: 20}]}>
                    Connectez-vous ou inscrivez-vous pour accéder à une variété d'avis et de commentaires sur vos jeux préférés !
                </Text>

                <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10, width: "60%", marginTop: 20}}>
                    <TouchableOpacity style={styles.ButtonMenu} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.textButtonMenu}>S'inscrire</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ButtonMenu} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.textButtonMenu}>Connexion</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.ButtonMenu} onPress={() => navigation.navigate('UserToken')}>
                    <Text style={styles.textButtonMenu}>Comment obtenir sa clé d'API Steam</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

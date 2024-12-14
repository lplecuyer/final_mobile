import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, Linking } from 'react-native';
import styles from '../assets/styles.js';


export default function UserToken({navigation}) {

    const handlePress = () => {
        Linking.openURL('https://steamcommunity.com/dev/apikey');
    };

    return (
        <ScrollView style={{ backgroundColor: '#343C53', flex: 1 }}>
            <View style={{justifyContent: 'flex-start', alignItems: 'center', }}>
                <Text style={ styles.title }>
                    Comment obtenir votre jeton d'API Steam
                </Text>
                <View style={{ height: 10, width: "80%", borderWidth: 3, borderBlockColor: '#B1B1AE' }} />

                <View style={{flexGrow: 1, marginTop: 80}}>

                    <Text style={styles.tinytext}>Étape 1: connectez vous a votre compte Steam</Text>
                    <Image source={require("../assets/how_to_connect.png")} style={{width: 400, height: 200, marginTop: 20}} resizeMode="contain"/>

                    <View style={styles.separator} />

                    <Text style={styles.tinytext}>Étape 2: allez sur <Text onPress={handlePress} >https://steamcommunity.com/dev/apikey </Text> (le lien est clickable) et remplissez le formulaire, un nom de domaine vous sera demandé, écrivez localhost, ou n'importe quel nom que vous voulez</Text>

                    <View style={styles.separator} />

                    <Text style={styles.tinytext}>Étape 3: Vous allez avoir besoin d'activer la fonctionnalité Steam Authenticator sur l'application mobile de Steam et d'activer l'authentification à 2 facteurs</Text>
                    <Text style={[styles.tinytext, {marginTop: 10}]}>Une fois que ceci est fait, vous allez avoir besoin de confirmer que c'est bien vous suite a une demande du site web. Sur l'application mobile de Steam, appuyez sur les 3 lignes en bas a droite de l'ecran, puis sur notification</Text>
                    <Image source={require("../assets/authenticator notifs.png")} style={{width: 400, height: 200, marginTop: 20, marginBottom: 20}} resizeMode="contain"/>

                    <View style={styles.separator} />

                    <Text style={styles.tinytext}>Vous avez maintenant acces à votre jeton d'API Steam!</Text>

                </View>
            </View>
        </ScrollView>
    );
}

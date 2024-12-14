import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../assets/styles.js';
import GameService from '../Services/GamesService.js';

export default function NavigationTemplate() {
    const [steam_id, setsteam_id] = useState(null);
    const navigation = useNavigation();

    
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const games = await GameService.GetAllGames();
                if (games.length > 0) {
                    const randomGame = games[Math.floor(Math.random() * games.length)];
                    setsteam_id(randomGame.steam_game_id);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des jeux :', error);
            }
        };

        fetchGames();
    }, []);

    return (
        <SafeAreaView style={{ width: '100%' }}>
            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('GamesList')}>
                    <Image source={require('../assets/Game_list.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (steam_id) {
                            navigation.navigate('ReviewsList', { gameid: steam_id });
                        } else {
                            alert('Aucun jeu sélectionné pour le moment.');
                        }
                    }}
                >
                    <Image source={require('../assets/Discover.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('User')}>
                    <Image source={require('../assets/User.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import styles from './assets/styles.js';
import ShtweamService from './Services/SteamService.js';

export default function GamesList({ navigation }) {

    
    const [selectedFilter, setSelectedFilter] = useState("OrderAZ");
    const [searchText, setSearchText] = useState("");

    const [gameNames, setGameNames] = useState([]);

    
    useEffect(() => {
        async function fetchGames() {
            const games = await Get_all_games();
            setGameNames(games);
            console.log('Noms des jeux :', games);
        }
        fetchGames();
    }, []);

    return (
        <View style={styles.background}>
            <Text style={[styles.title, {marginTop: 30}]}> Games List </Text>

            <View style={{ flexDirection: "row", justifyContent: "center", width: "100%", height: 50, marginTop: 30 }}>
                <View style={{ flexDirection: "row", width: "50%", alignItems: "center", justifyContent: "center" }}>
                    <Text style={styles.tinytext}>Filter By: </Text>
                    <Text style={styles.tinytext}>{selectedFilter}</Text>
                    <Picker
                        style={{ width: 30, height: 30, marginLeft: 10 }}
                        dropdownIconColor={'white'}
                        selectedValue={selectedFilter}
                        onValueChange={(itemValue) => setSelectedFilter(itemValue)}>
                        <Picker.Item label="Alphabetical ordered Name" value="Name A-Z" />
                        <Picker.Item label="Reversed alphabetical ordered Name" value="Name Z-A" />
                        <Picker.Item label="Date added to Steam newest -> oldest" value="DateNewOld" />
                        <Picker.Item label="Date added to Steam oldest -> newest" value="DateOldNew" />
                    </Picker>
                </View>
                <View style={{ width: "50%", alignItems: "center", justifyContent: "center" }}>
                    <TextInput style={styles.SearchBar} placeholder='Search Game' />
                </View>
            </View>
            <View style={[styles.separator, { width: "100%", marginTop: 10 }]} />
            <View style={styles.FlatList}>
                <FlatList 
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: 250 }}
                    data={gameNames}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{alignContent: 'center', flexDirection: "column", justifyContent: "center"}}>
                                <TouchableOpacity  onPress={() => navigation.navigate('ReviewsList', { gameid: item.appid })}>
                                    <Image 
                                        source={{ uri: item.image }} 
                                        style={styles.Game}
                                    />
                                </TouchableOpacity>
                                <Text style={[styles.tinytext, { textAlign: "center", marginBottom: 10 }]}>
                                    {item.name}
                                </Text>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    );

    async function Get_all_games() {
        
            const APIKEY = 'DC8DD54601F99078367C3B2305FFC527';
    
            try {
                const result = await ShtweamService.GetAllSteamGames(APIKEY);
                
                const gamesWithImages = await Promise.all(
                    result.map(async (game) => {
                        const image = await get_game_image(game.appid); // Remplacez 'appid' par l'identifiant approprié
                        return {
                            name: game.name,
                            appid: game.appid,
                            image, // Associe l'URL de l'image
                        };
                    })
                );

                return gamesWithImages;

            } catch (error) {
                console.error('Erreur lors de l’appel API:', error);
                return [];
            }
    }

    async function get_game_image(gameid) {
        try {
            const result = await ShtweamService.GetGameInfo(gameid);
            return result;
        } catch (error) {
            console.error('Erreur lors de l’appel API:', error);
            console.log('Erreur', 'Impossible de récupérer les informations utilisateur.');
        }
    }
}

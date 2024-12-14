import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../assets/styles.js';
import NavigationTemplate from '../Templates/NavigationTemplate.js';
import GameService from '../Services/GamesService.js';

export default function GamesList({ navigation }) {
    const [selectedFilter, setSelectedFilter] = useState("default");
    const [searchText, setSearchText] = useState("");
    const [gameNames, setGameNames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    
    useFocusEffect(
        useCallback(() => {
            async function fetchGames() {
                setIsLoading(true);
                try {
                    const games = await GameService.GetAllGames();
                    setGameNames(games);
                    setFilteredGames(games);
                } catch (error) {
                    console.error("Erreur lors de la récupération des jeux :", error);
                } finally {
                    setIsLoading(false);
                }
            }
            fetchGames();
        }, [])
    );

    
    useFocusEffect(
        useCallback(() => {
            handleSearch();
        }, [searchText])
    );

    useFocusEffect(
        useCallback(() => {
            handleSort();
        }, [selectedFilter])
    );

    const handleSearch = () => {
        const filtered = gameNames.filter(game =>
            game.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredGames(filtered);
    };

    const handleSort = () => {
        const sorted = [...filteredGames];
        if (selectedFilter === "OrderAZ") {
            sorted.sort((a, b) => a.name.localeCompare(b.name)); 
        } else if (selectedFilter === "OrderZA") {
            sorted.sort((a, b) => b.name.localeCompare(a.name)); 
        }
        setFilteredGames(sorted);
    };

    return (
        <View style={styles.background}>
            <Text style={[styles.title, { marginTop: 30 }]}> Liste de jeux </Text>

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.tinytext}>Chargement...</Text>
                </View>
            ) : (
                <>
                    <View style={{ flexDirection: "row", justifyContent: "center", width: "100%", height: 50, marginTop: 30 }}>
                        <View style={{ flexDirection: "row", width: "50%", alignItems: "center", justifyContent: "center", paddingHorizontal: 10 }}>
                            <Picker
                                style={{ width: 200, color: "white" }}
                                dropdownIconColor="white"
                                selectedValue={selectedFilter}
                                onValueChange={(itemValue) => setSelectedFilter(itemValue)}>
                                <Picker.Item label="Trier par " value="default" />
                                <Picker.Item label="Alphabetique" value="OrderAZ" />
                                <Picker.Item label="Alphabetique inverse" value="OrderZA" />
                            </Picker>
                        </View>
                        <View style={{ width: "50%", alignItems: "center", justifyContent: "center" }}>
                            <TextInput
                                style={styles.SearchBar}
                                placeholder="Rechercher un jeu"
                                value={searchText}
                                onChangeText={setSearchText}
                                onSubmitEditing={handleSearch}
                            />
                        </View>
                    </View>
                    <View style={[styles.separator, { width: "100%", marginTop: 10 }]} />
                    <FlatList
                        numColumns={2}
                        contentContainerStyle={{ paddingBottom: 250 }}
                        data={filteredGames}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ alignContent: 'center', flexDirection: "column", justifyContent: "center" }}>
                                <TouchableOpacity onPress={() => navigation.navigate('ReviewsList', { gameid: item.steam_game_id })}>
                                    <Image
                                        source={{ uri: item.image_url }}
                                        style={styles.Game}
                                    />
                                </TouchableOpacity>
                                <Text style={[styles.tinytext, { textAlign: "center", marginBottom: 10, maxWidth: 200, flexWrap: 'wrap', height: 50 }]}>
                                    {item.name}
                                </Text>
                            </View>
                        )}
                    />
                    <NavigationTemplate />
                </>
            )}
        </View>
    );
}

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../assets/styles.js';
import NavigationTemplate from '../Templates/NavigationTemplate.js';
import GameService from '../Services/GamesService.js';
import AuthService from '../authentification/AuthService.js';

export default function GameView({ navigation, route }) {
    const { game } = route.params;
    const [gameStatus, setGameStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [gameDetails, setGameDetails] = useState(game);
    const loggedInUser = AuthService.currentUser;



    useEffect(() => {
        const fetchGameDetails = async () => {
            setIsLoading(true);
            try {
                const name = game.name;
                const gameData = await GameService.GetGameByName(name);
                setGameDetails(gameData);
            } catch (error) {
                console.error('Error fetching game details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (game.appid) {
            fetchGameDetails();
        }
    }, [game, gameDetails.name]);


    useEffect(() => {
        const fetchGameStatus = async () => {
            setIsLoading(true);
            try {
                const user_id = loggedInUser.id;
                const game_id = gameDetails.id;
                const ids = { user_id, game_id };
                const status = await GameService.getGameStatus(ids);
                console.log("Fetched status:", status);

                if (status && status.length > 0) {
                    setGameStatus(status[0].game_completed);
                }
            } catch (error) {
                console.error('Error fetching game status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (gameDetails.id) {
            fetchGameStatus();
        }
    }, [gameDetails, loggedInUser]);


    const handleStatusUpdate = async () => {
        setIsLoading(true);
        try {
            const game_id = gameDetails.id;
            const user_id = loggedInUser.id;
            const statusforgame = { game_id, gameStatus, user_id };
            await GameService.updateGameStatus(statusforgame);
            alert('Game status updated successfully!');
        } catch (error) {
            console.error('Error updating game status:', error);
            alert('Failed to update game status.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <View style={[styles.background, { padding: 20 }]}>
                <Image source={{ uri: gameDetails.image_url }} style={styles.gameImage} />
                <Text style={styles.title}>{gameDetails.name}</Text>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <View>
                        <Text style={styles.tinytext}> Niveau de completion </Text>
                        <Picker
                            selectedValue={gameStatus}
                            onValueChange={(itemValue) => setGameStatus(itemValue)}
                            style={{ width: 200, color: "white" }}
                            dropdownIconColor="white"
                        >
                            <Picker.Item label="pas commencé" value="pas commencé" />
                            <Picker.Item label="c'est un début" value="c'est un début" />
                            <Picker.Item label="moitié de fait" value="moitié de fait" />
                            <Picker.Item label="presque fini" value="presque fini" />
                            <Picker.Item label="complété" value="complété" />
                        </Picker>

                        <TouchableOpacity style={styles.button} onPress={handleStatusUpdate}>
                            <Text style={styles.saveButtonText}>Save Status</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <NavigationTemplate />
        </>
    );
}

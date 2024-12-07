import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './assets/styles.js';
import ReviewService from './Services/ReviewsService.js';
import GameService from './Services/GamesService.js';

export default function ReviewsList({ navigation, route }) {
    const { gameid } = route.params;
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gameName, setGameName] = useState('');
    const [game_id, setGameId] = useState('');

    // Fonction pour récupérer le nom du jeu en fonction de gameid
    useEffect(() => {
        const fetchGameName = async () => {
            try {
                const game = await GameService.GetGameById(gameid);
                if (game) {
                    setGameName(game.name);
                    setGameId(game.id);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du nom du jeu :", error);
            }
        };

        fetchGameName();
    }, [gameid]);

    // Fonction pour récupérer les reviews après la mise à jour de game_id
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (!game_id) {
                    console.error("game_id est vide.");
                    return;
                }
                setLoading(true);
                const fetchedReviews = await ReviewService.GetAllReviewsForGame(game_id);
                setReviews(fetchedReviews);
            } catch (error) {
                console.error("Erreur en récupérant les reviews :", error);
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        if (game_id) {
            fetchReviews();
        }
    }, [game_id]); // Ce useEffect sera appelé uniquement lorsque game_id est mis à jour

    return (
        <View style={[styles.background, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>

            <Text style={[styles.title, { fontSize: 28, fontWeight: 'bold', marginTop: 10 }]}>Reviews pour le jeu:{'\n'} {gameName || 'Chargement...'}</Text>

            {loading ? (
                <Text style={{ fontSize: 16, color: '#555' }}>Chargement des reviews...</Text>
            ) : reviews.length > 0 ? (
                <FlatList
                    data={reviews}
                    keyExtractor={(item) => item.id.toString()} // Assurez-vous que chaque `id` est une chaîne ou un nombre
                    renderItem={({ item }) => (
                        <View style={reviewStyles.reviewCard}>
                            <Text style={reviewStyles.reviewTitle}>{item.title}</Text>
                            <Text style={reviewStyles.reviewContent}>{item.description}</Text>
                            <Text style={reviewStyles.reviewRating}>Note: {item.rating}/5</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.tinytext}>
                    Ce jeu n'a pas encore de reviews.
                </Text>
            )}

            <TouchableOpacity style={styles.ButtonMenu} onPress={() => navigation.navigate('AddReviewScreen', { gameid })}>
                <Text style={reviewStyles.addReviewText}>Ajouter une Review !</Text>
            </TouchableOpacity>
            
        </View>
    );
}

const reviewStyles = StyleSheet.create({
    reviewCard: {
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#27516C',
        borderColor: '#2a498c',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        width: "90%",
        marginTop: 30,
        marginLeft: "5%"
    },
    reviewTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    reviewContent: {
        fontSize: 16,
        marginBottom: 10,
    },
    reviewRating: {
        fontSize: 14,
        color: '#888',
    },
    addReviewText: {
        color: '#fff',
        fontSize: 16,
    },
});

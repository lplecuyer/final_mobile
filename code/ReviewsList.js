import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import styles from './assets/styles.js';
import ReviewService from './Services/ReviewsService.js';
import GameService from './Services/GamesService.js';
import AuthService from './authentification/AuthService.js';

export default function ReviewsList({ navigation, route }) {
    const loggedInUser = AuthService.currentUser;
    const { gameid } = route.params;
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gameName, setGameName] = useState('');
    const [game_id, setGameId] = useState('');
    const [userOwnsGame, setUserOwnsGame] = useState(false);

    // Fonction pour récupérer le nom du jeu
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

    // Fonction pour vérifier si l'utilisateur possède le jeu
    useEffect(() => {
        const checkUserOwnership = async () => {
            try {
                if (!game_id) return;
                const user_id = loggedInUser.id;
                const condition = { game_id, user_id };
                const ownsGame = await ReviewService.CheckIfUserOwnsGame(condition);
                setUserOwnsGame(ownsGame);
            } catch (error) {
                console.error("Erreur lors de la vérification de la possession du jeu :", error);
            }
        };

        if (game_id) {
            checkUserOwnership();
        }
    }, [game_id]);

    // Fonction pour récupérer les reviews et leurs auteurs
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (!game_id) {
                    console.error("game_id est vide.");
                    return;
                }
                setLoading(true);
                const fetchedReviews = await ReviewService.GetAllReviewsForGame(game_id);

                // Charger les noms des auteurs pour chaque review
                const reviewsWithAuthors = await Promise.all(
                    fetchedReviews.map(async (review) => {
                        try {
                            const author = await ReviewService.GetReviewWriter(review.user_id);
                            const authordata = author[0];
                            return { ...review, authorName: authordata.username };
                        } catch (error) {
                            console.error(`Erreur en récupérant l'auteur pour review ID ${review.id} :`, error);
                            return { ...review, authorName: 'Utilisateur inconnu' };
                        }
                    })
                );

                setReviews(reviewsWithAuthors);
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
    }, [game_id]);

    return (
        <View style={[styles.background, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.title, { fontSize: 28, fontWeight: 'bold', marginTop: 10 }]}>
                Reviews pour le jeu:{'\n'} {gameName || 'Chargement...'}
            </Text>

            {userOwnsGame && (
                <Text style={{ fontSize: 16, color: '#00FF00', marginBottom: 10 }}>
                    Vous possédez ce jeu.
                </Text>
            )}

            {loading ? (
                <Text style={{ fontSize: 16, color: '#555' }}>Chargement des reviews...</Text>
            ) : reviews.length > 0 ? (
                <FlatList
                    data={reviews}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={reviewStyles.reviewCard}>
                            <Text style={[reviewStyles.reviewAuthor, { color: '#B1B1AE' }]}>
                                Auteur : {item.authorName}
                            </Text>
                            <Text style={[reviewStyles.reviewTitle, { color: '#B1B1AE' }]}>{item.title}</Text>
                            <Text style={[reviewStyles.reviewContent, { color: '#B1B1AE' }]}>{item.description}</Text>
                            <Text style={reviewStyles.reviewRating}>
                                Note : <Rating disabled={true} size={15} baseColor='black' fillColor='white' rating={item.rating} />
                            </Text>

                            
                            {item.user_id === loggedInUser.id && (
                                <TouchableOpacity
                                    style={styles.ButtonMenu}
                                    onPress={() => navigation.navigate('ReviewUpdate', { item, game_id })}
                                >
                                    <Text style={reviewStyles.editButtonText}>Modifier</Text>
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
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
    reviewAuthor: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 5,
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
    editButton: {
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
    }
});

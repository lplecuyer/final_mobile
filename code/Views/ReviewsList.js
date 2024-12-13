import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Rating } from '@kolking/react-native-rating';
import NavigationTemplate from '../Templates/NavigationTemplate.js';
import styles from '../assets/styles.js';
import ReviewService from '../Services/ReviewsService.js';
import GameService from '../Services/GamesService.js';
import AuthService from '../authentification/AuthService.js';

export default function ReviewsList({ navigation, route }) {
    const loggedInUser = AuthService.currentUser;
    const { gameid } = route.params;
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gameName, setGameName] = useState('');
    const [game_id, setGameId] = useState('');
    const [userOwnsGame, setUserOwnsGame] = useState(false);
    const [hasUserReviewed, setHasUserReviewed] = useState(false);
    const [completionLevels, setCompletionLevels] = useState({});



    useEffect(() => {
        const fetchCompletionLevels = async () => {
            try {
                const levels = {};
                for (const review of reviews) {
                    const user_id = review.user_id;
                    const ids = { game_id, user_id };
                    const completion = await GameService.getGameStatus(ids);
                    levels[user_id] = completion[0]?.game_completed || "Non défini";
                }
                setCompletionLevels(levels);
            } catch (error) {
                console.error("Erreur lors de la récupération des niveaux de complétion :", error);
            }
        };
    
        if (reviews.length > 0) {
            fetchCompletionLevels();
        }
    }, [reviews, game_id]);
    

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

    useFocusEffect(
        useCallback(() => {
            const checkUserOwnership = async () => {
                try {
                    if (!game_id) return;
                    const user_id = loggedInUser.id;
                    const condition = { game_id, user_id };
                    const ownsGame = await ReviewService.CheckIfUserOwnsGameAndReviewed(condition);
    
                    setUserOwnsGame(ownsGame[0].owns_game);
                    setHasUserReviewed(ownsGame[0].has_reviewed);
                } catch (error) {
                    console.error("Erreur lors de la vérification de la possession du jeu :", error);
                }
            };
    
            if (game_id) {
                checkUserOwnership();
            }
    
            return () => {
                setUserOwnsGame(false);
                setHasUserReviewed(false);
            };
        }, [game_id, loggedInUser.id]) 
    );

    useFocusEffect(
        useCallback(() => {
            const fetchReviews = async () => {
                try {
                    if (!game_id) {
                        console.error("game_id est vide.");
                        return;
                    }
                    setLoading(true);

                    const user_id = loggedInUser.id;
                    const ids = {game_id, user_id};

                    const fetchedReviews = await ReviewService.GetAllReviewsForGame(ids);
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

            return () => {
                setReviews([]); 
                setLoading(false);
            };
        }, [game_id])
    );

    

    const HandleDelete = (reviewId) => {
        Alert.alert(
            "Confirmation de suppression",
            "Êtes-vous sûr de vouloir supprimer cette Review ? Tous les commentaires associés seront également supprimés.",
            [
                {
                    text: "Annuler",
                    style: "cancel",
                },
                {
                    text: "Supprimer",
                    onPress: async () => {
                        try {
                            const userid = loggedInUser.id;
                            const ids = { userid, reviewId };

                            await ReviewService.DeleteReview(ids);
                            setReviews((prevReviews) =>
                                prevReviews.filter((review) => review.id !== reviewId)
                            );
                            console.log("Review supprimée avec succès.");
                            setHasUserReviewed(false);
                        } catch (error) {
                            console.error("Erreur lors de la suppression de la review :", error);
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };


    return (
        <>
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
                            <TouchableOpacity style={reviewStyles.reviewCard}
                                onPress={() => navigation.navigate('Review', { review: item })}>
                                <Text style={[reviewStyles.reviewAuthor, { color: '#B1B1AE' }]}>
                                    Auteur : {item.authorName} 
                                    {completionLevels[item.user_id] !== undefined && (
                                        <Text> (Completion : {completionLevels[item.user_id]})</Text>
                                    )}
                                </Text>
                                <Text style={[reviewStyles.reviewTitle, { color: '#B1B1AE' }]}>{item.title}</Text>
                                <Text style={[reviewStyles.reviewContent, { color: '#B1B1AE' }]}>{item.description}</Text>
                                <Text style={reviewStyles.reviewRating}>
                                    Note : <Rating disabled={true} size={15} baseColor='black' fillColor='white' rating={item.rating} />
                                </Text>
                        
                                {item.user_id === loggedInUser.id && (
                                    <>
                                        <TouchableOpacity
                                            style={styles.ButtonMenu}
                                            onPress={() => navigation.navigate('ReviewUpdate', { item, game_id })}
                                        >
                                            <Text style={reviewStyles.editButtonText}>Modifier</Text>
                                        </TouchableOpacity>
                        
                                        <TouchableOpacity
                                            style={[styles.ButtonMenu, { backgroundColor: "#8b0609" }]}
                                            onPress={() => HandleDelete(item.id)}
                                        >
                                            <Text style={reviewStyles.editButtonText}>Supprimer</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </TouchableOpacity>
                        )}
                        
                        
                    />
                ) : (
                    <Text style={styles.tinytext}>
                        Ce jeu n'a pas encore de reviews.
                    </Text>
                )}

                {userOwnsGame && !hasUserReviewed && (
                    <TouchableOpacity style={styles.ButtonMenu} onPress={() => navigation.navigate('ReviewUpdate', { game_id })}>
                        <Text style={reviewStyles.addReviewText}>Ajouter une Review !</Text>
                    </TouchableOpacity>
                )}

                {hasUserReviewed && (
                    <Text style={{ fontSize: 16, color: '#888', marginBottom: 10 }}>
                        Merci pour votre Review!
                    </Text>
                )}

            </View>
            <NavigationTemplate />
        </>
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

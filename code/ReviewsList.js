import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import styles from './assets/styles.js';
import ReviewService from './Services/ReviewsService.js';

export default function ReviewsList({ navigation, route }) {
    const { gameid } = route.params; // Récupérer le game ID depuis les paramètres de navigation
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Charger les reviews pour ce game ID
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const fetchedReviews = await ReviewService.GetAllReviewsForGame(gameid);
                setReviews(fetchedReviews);
            } catch (error) {
                console.error("Erreur en récupérant les reviews :", error);
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [gameid]);

    return (
        <View style={[styles.background, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            {loading ? (
                <Text>Chargement...</Text> // Afficher un indicateur pendant le chargement
            ) : reviews.length > 0 ? (
                <FlatList
                    data={reviews}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                            <Text>{item.content}</Text>
                            <Text>Note: {item.rating}/10</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#555' }}>This game has no reviews.</Text>
            )}
        </View>
    );
}

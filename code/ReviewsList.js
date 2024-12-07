import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './assets/styles.js';
import ReviewService from './Services/ReviewsService.js';

export default function ReviewsList({ navigation, route }) {
    const { gameid } = route.params;
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
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
                <Text style={{ fontSize: 16, color: '#555' }}>Loading reviews...</Text>
            ) : reviews.length > 0 ? (
                <FlatList
                    data={reviews}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={reviewStyles.reviewCard}>
                            <Text style={reviewStyles.reviewTitle}>{item.title}</Text>
                            <Text style={reviewStyles.reviewContent}>{item.content}</Text>
                            <Text style={reviewStyles.reviewRating}>Note: {item.rating}/5</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.tinytext}>
                    This game has no reviews.
                </Text>
            )}

            <TouchableOpacity style={styles.ButtonMenu} onPress={() => navigation.navigate('AddReviewScreen', { gameid })}>
                <Text style={reviewStyles.addReviewText}>Add a Review!</Text>
            </TouchableOpacity>
        </View>
    );
}

const reviewStyles = StyleSheet.create({
    reviewCard: {
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        width: '90%',
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

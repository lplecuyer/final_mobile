import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import styles from '../assets/styles.js';
import AuthService from '../authentification/AuthService.js';
import ReviewService from '../Services/ReviewsService.js';

export default function ReviewUpdate({ navigation, route }) {
    const { item, game_id } = route.params || {}; // `item` peut être null ou undefined
    const loggedInUser = AuthService.currentUser;

    // Initialiser les états
    const [title, setTitle] = useState(item?.title || '');
    const [description, setDescription] = useState(item?.description || '');
    const [rating, setRating] = useState(item?.rating || 0);

    // Fonction pour sauvegarder (création ou mise à jour)
    const handleSave = async () => {
        const inputs = {
            title,
            description,
            rating,
            game_id,
            user_id: loggedInUser.id,
        };

        try {
            if (item) {
                // Mise à jour
                inputs.id = item.id;
                await ReviewService.UpdateReview(inputs);
                console.log('Review mise à jour:', inputs);
            } else {
                // Création
                await ReviewService.CreateReview(inputs);
                console.log('Nouvelle review créée:', inputs);
            }
            navigation.goBack();
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
        }
    };

    // Gestion de la note
    const handleChange = useCallback((newRating) => setRating(newRating), []);

    return (
        <View style={[styles.background, { flex: 1, padding: 20 }]}>
            <Rating scale={1.5} baseColor="black" fillColor="white" touchColor="white" rating={rating} onChange={handleChange} />

            <TextInput
                style={[styles.textInput, { width: '90%', color: '#B1B1AE', fontSize: 16, height: 50 }]}
                placeholder="Titre de la review"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[styles.textInput, { color: '#B1B1AE', height: '60%', width: '90%', textAlignVertical: 'top' }]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={40}
            />

            <TouchableOpacity style={styles.ButtonMenu} onPress={handleSave}>
                <Text style={{ fontSize: 16 }}>Sauvegarder</Text>
            </TouchableOpacity>
        </View>
    );
}

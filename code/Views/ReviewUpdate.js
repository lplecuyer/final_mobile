import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import styles from '../assets/styles.js';
import AuthService from '../authentification/AuthService.js';
import ReviewService from '../Services/ReviewsService.js';

export default function ReviewUpdate({ navigation, route }) {
    const { item, game_id } = route.params || {}; 
    const loggedInUser = AuthService.currentUser;

    const [title, setTitle] = useState(item?.title || '');
    const [description, setDescription] = useState(item?.description || '');
    const [rating, setRating] = useState(item?.rating || 0);

    
    const sanitizeInput = (input) => {
        return input.trim().replace(/[^\w\s]/gi, '');
    };

    // Vérifier que le titre a plus de 5 caractères
    const handleSave = async () => {
        if (title.length <= 5) {
            Alert.alert('Erreur', 'Le titre doit contenir plus de 5 caractères.');
            return;
        }

        const sanitizedTitle = sanitizeInput(title);
        const sanitizedDescription = sanitizeInput(description);

        const inputs = {
            title: sanitizedTitle,
            description: sanitizedDescription,
            rating,
            game_id,
            user_id: loggedInUser.id,
        };

        try {
            if (item) {
                inputs.id = item.id;
                await ReviewService.UpdateReview(inputs);
                console.log('Review mise à jour:', inputs);
            } else {
                await ReviewService.CreateReview(inputs);
                console.log('Nouvelle review créée:', inputs);
            }
            navigation.goBack();
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
        }
    };

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

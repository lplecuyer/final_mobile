import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import styles from './assets/styles.js';
import AuthService from './authentification/AuthService.js';
import ReviewService from './Services/ReviewsService.js';

export default function ReviewUpdate({ navigation, route }) {
    const { item } = route.params;

    // Définir les états pour le titre, la description et la note
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [rating, setRating] = useState(item.rating);

    // Fonction de sauvegarde des modifications
    const handleSave = async () => {
        const inputs = {
            title,
            description,
            rating,
            id: item.id
        };

        try {
            await ReviewService.UpdateReview(inputs);
            console.log('Modifications sauvegardées:', inputs);
            
            navigation.goBack();
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
        }
    };

    
    const handleChange = useCallback((newRating) => setRating(newRating), []);

    return (
        <View style={[styles.background, { flex: 1, padding: 20 }]}>
            {/* Composant Rating - mise à jour de la note */}
            <Rating  scale={1.5} baseColor='black' fillColor='white' touchColor='white' rating={rating} onChange={handleChange} />

            {/* Input pour le titre */}
            <TextInput
                style={[styles.textInput, { width: '90%', color: '#B1B1AE', fontSize: 16, height: 50 }]}
                placeholder="Titre de la review"
                value={title}
                onChangeText={setTitle} // Mise à jour de l'état du titre
            />

            {/* Input pour la description */}
            <TextInput
                style={[styles.textInput, { color: '#B1B1AE', height: '60%', width: '90%', textAlignVertical: 'top' }]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription} // Mise à jour de l'état de la description
                multiline={true}
                numberOfLines={40}
            />

            {/* Bouton de sauvegarde */}
            <TouchableOpacity style={styles.ButtonMenu} onPress={handleSave}>
                <Text style={{ fontSize: 16 }}>Sauvegarder</Text>
            </TouchableOpacity>
        </View>
    );
}

const localStyles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        fontSize: 16,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import styles from './assets/styles.js';
import ReviewService from './Services/ReviewsService.js';
import GameService from './Services/GamesService.js';
import AuthService from './authentification/AuthService.js';

export default function ReviewCreate({ navigation, route }) {
    const { gameid } = route.params;

    const loggedInUser = AuthService.currentUser;

    // State pour les champs du formulaire
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(4.0);
    const [gameName, setGameName] = useState('');
    const [gameId, setGameId] = useState('');

    // Fonction pour récupérer le nom du jeu
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

    // Utiliser useEffect pour appeler la fonction lors du chargement du composant
    useEffect(() => {
        fetchGameName();
    }, [gameid]);

    // Fonction pour gérer le changement de note
    const handleChange = useCallback((newRating) => setRating(newRating), []);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async () => {
        if (!title || !description) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        const newReview = {
            user_id: loggedInUser.id,
            game_id: gameId,
            title,
            description,
            rating,
        };

        try {
            const result = await ReviewService.CreateReview(newReview);
            if (result) {
                Alert.alert('Succès', 'Votre review a été créée avec succès !', [
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert('Erreur', "Impossible de créer la review. Veuillez réessayer.");
            }
        } catch (error) {
            console.error('Erreur lors de la création de la review :', error);
            Alert.alert('Erreur', "Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    return (
        <View style={[styles.background, { flex: 1, padding: 20 }]}>
            <Text style={[styles.tinytext, { fontSize: 18 }]}>
                Ajouter une review pour le jeu {'\n'}"{gameName || 'Chargement...'}"
            </Text>

            <Rating  scale={1.5} baseColor='black' fillColor='white' touchColor='white' rating={rating} onChange={handleChange} />

            <TextInput
                style={[styles.textInput, { width: '90%', color: '#B1B1AE', fontSize: 16, height: 50 }]}
                placeholder="Review Title"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[styles.textInput, {color: '#B1B1AE', height: '60%', width: '90%', textAlignVertical: "top"}]}
                placeholder='description'
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={40}
            />

            <TouchableOpacity style={localStyles.button} onPress={handleSubmit}>
                <Text style={localStyles.buttonText}>Envoyer</Text>
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

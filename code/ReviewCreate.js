import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import styles from './assets/styles.js';
import ReviewService from './Services/ReviewsService.js';
import GameService from './Services/GamesService.js'; // Assurez-vous que GameService est importé correctement

export default function ReviewCreate({ navigation, route }) {
    const { gameid } = route.params;

    // State pour les champs du formulaire
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(5); // Note par défaut
    const [gameName, setGameName] = useState('');

    // Fonction pour récupérer le nom du jeu
    const fetchGameName = async () => {
        try {
            const name = await GameService.GetGameNameById(gameid);
            if (name) {
                setGameName(name); // Mettre à jour le nom du jeu dans le state
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du nom du jeu :", error);
            Alert.alert("Erreur", "Impossible de récupérer le nom du jeu.");
        }
    };

    // Utiliser useEffect pour appeler la fonction lors du chargement du composant
    useEffect(() => {
        fetchGameName();
    }, [gameid]);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async () => {
        if (!title || !description) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        const newReview = {
            game_id: gameid,
            title,
            content: description,
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
            <Text style={styles.title}>Ajouter une review pour le jeu "{gameName || 'chargement...'}"</Text>

            <Text style={styles.label}>Note :</Text>
            <AirbnbRating
                defaultRating={5}
                size={30}
                onFinishRating={setRating}
            />

            <TextInput
                style={localStyles.input}
                placeholder="Titre"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[localStyles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
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

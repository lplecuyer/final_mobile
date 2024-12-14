import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CommentsService from '../Services/CommentsService';

export default function UpdateComment({ route, navigation }) {
    const { commentId, initialText } = route.params;
    const [updatedText, setUpdatedText] = useState(initialText);

    const handleUpdate = async () => {
        if (!updatedText.trim()) {
            console.warn("Le commentaire ne peut pas être vide.");
            return;
        }

        try {
            await CommentsService.UpdateComment(commentId, { description: updatedText });
            navigation.goBack();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du commentaire :", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Modifier le commentaire</Text>
            <TextInput
                style={styles.input}
                value={updatedText}
                onChangeText={setUpdatedText}
                placeholder="Modifier le commentaire"
                placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Sauvegarder</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#2c2f48',
    },
    header: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#374151',
        color: '#ffffff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import CommentsService from './Services/CommentsService.js';
import AuthService from './authentification/AuthService.js';
import { useNavigation } from '@react-navigation/native';

export default function Review({ route }) {
    const { review } = route.params;
    const review_id = review.id;
    const [comments, setComments] = useState([]);
    const [newText, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [editCommentId, setEditCommentId] = useState(null); // Pour suivre le commentaire en édition

    const loggedInUser = AuthService.currentUser;
    const navigation = useNavigation();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                if (!review_id) {
                    console.error("review_id est vide.");
                    return;
                }
                setLoading(true);
                const fetchedComments = await CommentsService.GetAllCommentsForReview(review_id);

                const commentsWithAuthors = await Promise.all(
                    fetchedComments.map(async (comment) => {
                        try {
                            const author = await CommentsService.GetCommentWriter(comment.userId);
                            return { ...comment, authorName: author?.[0]?.username || 'Auteur inconnu' };
                        } catch (error) {
                            console.error(`Erreur en récupérant l'auteur pour commentaire ID ${comment.id}:`, error);
                            return { ...comment, authorName: 'Auteur inconnu' };
                        }
                    })
                );

                setComments(commentsWithAuthors);
            } catch (error) {
                console.error("Erreur en récupérant les commentaires :", error);
                setComments([]);
            } finally {
                setLoading(false);
            }
        };

        if (review_id) {
            fetchComments();
        }
    }, [review_id]);

    const addComment = async () => {
        const newComment = {
            user_id: loggedInUser.id,
            review_id,
            newText
        };

        if (newComment.newText.trim() !== '') {
            try {
                const newCommentData = await CommentsService.addComment(newComment);

                if (newCommentData) {
                    const updatedComments = [...comments, { ...newCommentData }];
                    setComments(updatedComments);
                    setNewComment('');
                }
            } catch (error) {
                console.error("Erreur lors de l'ajout du commentaire :", error);
            }
        } else {
            console.warn("Le commentaire ne peut pas être vide.");
        }
    };

    const startEditComment = (comment) => {
        setEditCommentId(comment.id); // Mettre à jour l'ID du commentaire en édition
        setNewComment(comment.description); // Pré-remplir le champ avec le texte du commentaire
    };

    const updateComment = async (commentId) => {
        if (newText.trim() === '') return;

        try {
            await CommentsService.updateComment(commentId, { description: newText });
            const updatedComments = comments.map(comment =>
                comment.id === commentId ? { ...comment, description: newText } : comment
            );
            setComments(updatedComments);
            setEditCommentId(null); // Quitter le mode édition
            setNewComment('');
        } catch (error) {
            console.error("Erreur lors de la mise à jour du commentaire :", error);
        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.reviewContainer}>
                <Text style={styles.author}>Auteur : {review.authorName}</Text>
                <Text style={styles.title}>{review.title}</Text>
                <Text style={styles.description}>{review.description}</Text>
                <Text style={styles.rating}>Note : {renderStars(review.rating)}</Text>
            </View>

            <Text style={styles.commentsHeader}>Commentaires :</Text>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Text style={styles.commentAuthor}>{item.authorName || 'Auteur inconnu'} :</Text>

                            <Text style={styles.commentText}>{item.description || 'Commentaire vide'}</Text>

                        {item.userId === loggedInUser.id && (
    <TouchableOpacity
        style={styles.ButtonMenu}
        onPress={() => navigation.navigate('UpdateComment', {
            commentId: item.id,
            initialText: item.description, // Passer le texte actuel
        })}
    >
        <Text style={reviewStyles.editButtonText}>Modifier</Text>
    </TouchableOpacity>
)}
                    </View>
                )}
                style={styles.commentsList}
            />

            <View style={styles.addCommentContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Écrire un commentaire..."
                    placeholderTextColor="#888"
                    value={newText}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity style={styles.addCommentButton} onPress={addComment}>
                    <Text style={styles.addCommentButtonText}>Ajouter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function renderStars(rating) {
    const totalStars = 5;
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(totalStars - rating);
    return `${filledStars}${emptyStars}`;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#2c2f48',
    },
    reviewContainer: {
        backgroundColor: '#374151',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    author: {
        color: '#b0bec5',
        fontSize: 14,
        marginBottom: 5,
    },
    title: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        color: '#d1d1d1',
        fontSize: 16,
        marginBottom: 15,
    },
    rating: {
        color: '#ffaa00',
        fontSize: 16,
        marginBottom: 20,
    },
    commentsHeader: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentsList: {
        flex: 1,
        marginBottom: 20,
    },
    commentContainer: {
        backgroundColor: '#475569',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    commentAuthor: {
        color: '#b0bec5',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    commentText: {
        color: '#d1d1d1',
    },
    commentInput: {
        flex: 1,
        backgroundColor: '#374151',
        color: '#ffffff',
        padding: 10,
        borderRadius: 5,
    },
    addCommentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addCommentButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    addCommentButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    ButtonMenu: {
        backgroundColor: '#4BB50D', 
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        elevation: 3, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 2, 
        alignItems: 'center',
        marginVertical: 10
    },
});

const reviewStyles = StyleSheet.create({
    editButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import NavigationTemplate from '../Templates/NavigationTemplate.js';
import ShtweamService from '../Services/SteamService.js';
import AuthService from '../authentification/AuthService.js';
import GameService from '../Services/GamesService.js';
import ReviewService from '../Services/ReviewsService.js';

export default function UserMenu({ navigation }) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userGames, setUserGames] = useState([]);
    const [userImage, setUserImage] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [checkingGames, setCheckingGames] = useState({});
    const loggedInUser = AuthService.currentUser;

    const [importedGames, setImportedGames] = useState({});

    useEffect(() => {
        const checkImportedGames = async () => {
            const importedGamesData = {};
            for (const game of games) {
                const isImported = await isGameImported(game.appid);
                importedGamesData[game.appid] = isImported;
            }
            setImportedGames(importedGamesData);
        };

        if (games.length > 0) {
            checkImportedGames();
        }
    }, [games]);

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const user_id = loggedInUser.id;
                const userReviews = await ReviewService.GetReviewsForUser(user_id);

                const reviewsWithGameNames = await Promise.all(userReviews.map(async (review) => {
                    const id = review.game_id
                    const gameDetails = await GameService.GetGame(id);
                    return {
                        ...review,
                        game_name: gameDetails ? gameDetails.name : 'Jeu inconnu',
                    };
                }));

                setReviews(reviewsWithGameNames);
            } catch (error) {
                console.error("Erreur en récupérant les reviews de l'utilisateur :", error);
            }
        };


        fetchUserReviews();
    }, [loggedInUser]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const userGamesData = await ShtweamService.GetGamesForUser(loggedInUser.token, loggedInUser.steam_id);

                const gamesWithDetails = await Promise.all(
                    userGamesData.map(async (game) => {
                        const details = await ShtweamService.GetGameInfo(game.appid);
                        return details
                            ? { appid: game.appid, ...details }
                            : { appid: game.appid, name: 'Jeu inconnu', header_image: null };
                    })
                );

                setGames(gamesWithDetails);
                setUserGames(userGamesData);
            } catch (error) {
                console.error("Erreur en récupérant les jeux :", error);
                setGames([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const handleImportGames = async () => {
        const importPromises = games.map(async (game) => {
            const { name, header_image, appid } = game;
            const user_id = loggedInUser.id;

            const isImported = await isGameImported(appid);

            if (!isImported) {
                const infos = { name, header_image, appid, user_id };
                try {
                    await GameService.ImportGame(infos);
                    setImportedGames((prev) => ({
                        ...prev,
                        [appid]: true,
                    }));

                    Toast.show({
                        type: 'success',
                        text1: 'Succès',
                        text2: `${name} importé avec succès!`,
                        position: 'top',
                    });
                } catch (error) {
                    console.error(`Erreur lors de l'import de ${name} :`, error);
                }
            } else {
                Toast.show({
                    type: 'info',
                    text1: 'Déjà importé',
                    text2: `${name} est déjà dans votre collection.`,
                    position: 'top',
                });
            }
        });
        await Promise.all(importPromises);
    };

    const handleUnimportGame = async (appid) => {
        try {
            const user_id = loggedInUser.id;
            const ids = { user_id, appid };
            const response = await GameService.RemoveGameFromUser(ids);
            if (response.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'Jeu désimporté avec succès',
                    position: 'top',
                });
                setImportedGames((prevImportedGames) => ({
                    ...prevImportedGames,
                    [appid]: false,
                }));

            } else {
                console.error("Erreur lors de la suppression du jeu");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du jeu :", error);
        }
    };

    useEffect(() => {
        const fetchUserImage = async () => {
            try {
                const token = loggedInUser.token;
                const steam_id = loggedInUser.steam_id;
                const stuff = { token, steam_id };
                const userInfo = await ShtweamService.GetUser(stuff);
                console.log(userInfo);
                if (userInfo && userInfo.avatarfull) {
                    setUserImage(userInfo.avatarfull);
                }
            } catch (error) {
                console.error("Erreur en récupérant l'image de l'utilisateur :", error);
            }
        };

        fetchUserImage();
    }, [loggedInUser]);

    const isGameImported = async (appid) => {
        setCheckingGames((prev) => ({ ...prev, [appid]: true }));
        try {
            const user_id = loggedInUser.id;
            const ids = { user_id, appid };
            const result = await GameService.UserHasGame(ids);
            return result;
        } catch (error) {
            console.error("Erreur lors de la vérification du jeu importé :", error);
            return false;
        } finally {
            setCheckingGames((prev) => ({ ...prev, [appid]: false }));
        }
    };

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            Toast.show({
                type: 'success',
                text1: 'Déconnexion réussie',
                position: 'top',
            });
            navigation.navigate('MainMenu');
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Impossible de se déconnecter.',
                position: 'top',
            });
        }
    };



    return (
        <View style={styles.background}>
            <View style={styles.menucontainer}>
                <View style={[styles.userContainer, { marginLeft: 20, alignItems: 'center' }]}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={userImage ? { uri: userImage } : require('../assets/User_Icon.png')}
                            style={styles.logo}
                        />
                    </View>
                    <View style={{ marginTop: 25, alignItems: 'center' }}>
                        <Text style={[styles.title, { marginTop: 10 }]}>{loggedInUser.username}</Text>
                        <TouchableOpacity onPress={handleLogout} style={[styles.button, { backgroundColor: 'crimson', marginTop: 10 }]}>
                            <Text style={[styles.title, { fontSize: 10 }]}>Se déconnecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={[styles.reviewContainerContainer, { bottom: 5 }]}>
                    <Text style={[styles.smallText, { marginLeft: 0 }]}>Reviews</Text>
                    <View style={styles.reviewContainer}>
                        {reviews.length === 0 ? (
                            <Text style={styles.noReviewsText}>Aucune review pour l'instant</Text>
                        ) : (
                            <FlatList
                                data={reviews}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.review} onPress={() => navigation.navigate('Review', { review: item })}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={[styles.title, { fontSize: 10, color: "gray" }]}>{item.game_name}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.id.toString()}
                            />
                        )}
                    </View>
                </View>

            </View>

            <Text style={styles.bigText}>Mes Jeux</Text>

            {loading ? (
                <Text style={{ color: '#fff', marginVertical: 20 }}>Chargement des jeux...</Text>
            ) : games.length > 0 ? (
                <FlatList
                    style={styles.gameList}
                    data={games}
                    keyExtractor={(item) => item.appid.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.gameContainer}
                            onPress={() => {
                                if (importedGames[item.appid]) {
                                    navigation.navigate('GameView', { game: item });
                                } else {
                                    Toast.show({
                                        type: 'info',
                                        text1: 'Jeu non importé',
                                        text2: `Veuillez importer ${item.name} avant d'accéder aux détails.`,
                                        position: 'top',
                                    });
                                }
                            }}
                        >
                            {item.header_image ? (
                                <Image source={{ uri: item.header_image }} style={styles.gameIcon} />
                            ) : (
                                <Image source={require('../assets/User_Icon.png')} style={styles.gameIcon} />
                            )}

                            <Text style={styles.smallText} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>

                            {checkingGames[item.appid] ? (
                                <Image
                                    source={require('../assets/steam_bird.png')}
                                    style={styles.loadingIcon}
                                />
                            ) : (
                                importedGames[item.appid] && (
                                    <TouchableOpacity
                                        style={styles.unimportButton}
                                        onPress={() => handleUnimportGame(item.appid)}
                                    >
                                        <Text style={styles.unimportButtonText}>Unimport</Text>
                                    </TouchableOpacity>
                                )
                            )}
                        </TouchableOpacity>
                    )}
                />

            ) : (
                <Text style={{ color: '#fff', marginVertical: 20 }}>Aucun jeu pour l'instant.</Text>
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={handleImportGames}
            >
                <Text style={{ color: '#fff', fontSize: 16 }}>Importer mes jeux Steam</Text>
            </TouchableOpacity>

            <NavigationTemplate />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#343C53',
        flex: 1,
        alignItems: 'center',
    },
    bigText: {
        color: '#C5C3C0',
        fontWeight: 'bold',
        fontSize: 50,
        textAlign: 'center',
        marginTop: 10,
    },
    smallText: {
        color: '#B1B1AE',
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        textAlign: 'left',
        flexShrink: 1,
        width: "80%"
    },
    menucontainer: {
        backgroundColor: '#121315',
        width: '100%',
        height: '40%',
        elevation: 30,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    logoContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        top: 35,
    },
    logo: {
        width: 100,
        height: 100
    },
    userContainer: {
        width: '40%',
    },
    reviewContainer: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: '80%',
    },
    review: {
        width: 90,
        height: 40,
        marginTop: 10,
        marginLeft: 15,
    },
    reviewContainerContainer: {
        width: '60%',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    gameContainer: {
        backgroundColor: '#535353',
        width: '100%',
        height: 60,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        flexWrap: "wrap"
    },
    gameIcon: {
        marginLeft: 10,
        margin: 7,
        height: 40,
        width: 40,
    },
    gameList: {
        width: '90%',
    },
    unimportButton: {
        backgroundColor: '#FF4C4C',
        padding: 5,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 10,
    },
    unimportButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    reviewContainer: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
    },

    reviewTouchable: {
        backgroundColor: '#2C2F3B',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        elevation: 4,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    review: {
        width: '90%',
        padding: 10,
        backgroundColor: '#444',
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    smallText: {
        color: '#B1B1AE',
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        textAlign: 'left',
        flexShrink: 1,
        width: '60%',
    },
    button: {
        backgroundColor: '#4BB50D',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    noReviewsText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: '50%',
    },
    loadingIcon: {
        width: 20,
        height: 20,
        marginLeft: 'auto',
        marginRight: 10,
    },
});

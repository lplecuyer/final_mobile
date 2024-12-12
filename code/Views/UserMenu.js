import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import NavigationTemplate from '../Templates/NavigationTemplate.js';
import ShtweamService from '../Services/SteamService.js';
import AuthService from '../authentification/AuthService.js';
import GameService from '../Services/GamesService.js';

export default function UserMenu() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userGames, setUserGames] = useState([]); 
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
        const fetchGames = async () => {
            try {
                setLoading(true);
                console.log(loggedInUser);
                const userGamesData = await ShtweamService.GetGamesForUser(loggedInUser.token, loggedInUser.steam_id);

                // Charge les détails de chaque jeu
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
    }, []); // This only runs once when the component mounts

    const handleImportGames = async () => {
        const importPromises = games.map(async (game) => {
            const { name, header_image, appid } = game;
            const infos = { name, header_image, appid };

            try {
                const response = await GameService.ImportGame(infos);
                console.log(`Import de ${name} : ${response.success ? "Succès" : "Échec"}`);
                if (response.success) {
                    await handleImportGamesIntoUserGame(appid);
                }
            } catch (error) {
                console.error(`Erreur lors de l'import de ${name} :`, error);
            }
        });
        await Promise.all(importPromises);

        alert("Jeux importés avec succès!");
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
                    position: 'bottom',
                });
                setUserGames(userGames.filter((game) => game.appid !== appid)); // Remove the game from userGames
            } else {
                console.error("Erreur lors de la suppression du jeu");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du jeu :", error);
        }
    };

    const handleImportGamesIntoUserGame = async (appid) => {
        const userid = loggedInUser.id;
        const UserGameInfos = { userid, appid };

        try {
            const response = await GameService.ImportGameIntoUserGame(UserGameInfos);
            console.log(`Import du jeu dans UserGame : ${response.success ? "Succès" : "Échec"}`);
        } catch (error) {
            if (error.message.includes("SQLSTATE[23000]")) {
                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'Votre jeu a été importé',
                    position: 'bottom',
                });
            } else {
                console.error(`Erreur lors de l'import dans UserGame :`, error);
            }
        }
    };

    const isGameImported = async (appid) => {
        try {
            const user_id = loggedInUser.id;
            const ids = { user_id, appid }
            const result = await GameService.UserHasGame(ids);
            return result;
        } catch (error) {
            console.error("Erreur lors de la vérification du jeu importé :", error);
            return false;
        }
    };


    return (
        <View style={styles.background}>
            <View style={styles.menucontainer}>
                <View style={styles.userContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/User_Icon.png')} style={styles.logo} />
                    </View>
                    <Text style={styles.smallText}>{loggedInUser.username}</Text>
                    <Text style={styles.smallText}>Level</Text>
                    <Text style={styles.smallText}>Achievement : 42</Text>
                </View>

                <View style={styles.reviewContainerContainer}>
                    <Text style={[styles.smallText, { marginLeft: 0 }]}>Reviews</Text>
                    <View style={styles.reviewContainer}>
                        <FlatList
                            numColumns={2}
                            data={[...Array(10)]}
                            renderItem={() => (
                                <Image source={require('../assets/User_Icon.png')} style={styles.review} />
                            )}
                        />
                    </View>
                </View>
            </View>

            <Text style={styles.bigText}>My Games</Text>

            {loading ? (
                <Text style={{ color: '#fff', marginVertical: 20 }}>Chargement des jeux...</Text>
            ) : games.length > 0 ? (
                <FlatList
                    style={styles.gameList}
                    data={games}
                    keyExtractor={(item) => item.appid.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.gameContainer}>
                            {item.header_image ? (
                                <Image source={{ uri: item.header_image }} style={styles.gameIcon} />
                            ) : (
                                <Image source={require('../assets/User_Icon.png')} style={styles.gameIcon} />
                            )}
                            <Text style={styles.smallText}>{item.name}</Text>

                            {importedGames[item.appid] && (
                                <TouchableOpacity
                                    style={styles.unimportButton}
                                    onPress={() => handleUnimportGame(item.appid)}
                                >
                                    <Text style={styles.unimportButtonText}>Unimport</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                    )}
                />
            ) : (
                <Text style={{ color: '#fff', marginVertical: 20 }}>Aucun jeu pour l'instant.</Text>
            )}

            <TouchableOpacity
                style={{
                    backgroundColor: '#535353',
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 20,
                    alignItems: 'center',
                }}
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
        top: 10,
    },
    logo: {
        width: 100,
        height: 100,
        left: 10,
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
});

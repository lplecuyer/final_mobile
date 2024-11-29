class SteamService {
    async GetUser(APIKEY, USERID) {
        try {
            const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${APIKEY}&steamids=${USERID}`, {
                method: 'GET', // L'API attend une requête GET
            });

            const data = await response.json();

            if (data.response && data.response.players.length > 0) {
                // Si des joueurs sont retournés
                return data.response.players[0]; // Retourne les informations du premier joueur
            } else {
                // Aucun utilisateur trouvé
                throw new Error("Aucun utilisateur trouvé avec cet ID.");
            }
        } catch (error) {
            console.error("Erreur lors de l'appel API:", error.message);
            throw error; // Relance l'erreur pour la gestion dans le composant
        }
    }

    async GetAllSteamGames(APIKEY) {
        try {
            const response = await fetch(`https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${APIKEY}&max_results=5`, {
                method: 'GET', // L'API attend une requête GET
            });

            const data = await response.json();

            if (data.response && data.response.apps.length > 0) {
                // Parcourt le tableau et récupère les noms des applications
                return data.response.apps
            } else {
                // Aucun utilisateur trouvé
                throw new Error("Aucun utilisateur trouvé avec cet ID.");
            }
        } catch (error) {
            console.error("Erreur lors de l'appel API:", error.message);
            throw error; // Relance l'erreur pour la gestion dans le composant
        }
    }

    async GetGamesForUser(APIKEY, USERID) {
        try {
            const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=${APIKEY}&steamid=${USERID}&format=json`, {
                method: 'GET', // L'API attend une requête GET
            });

            const data = await response.json();

            if (data.response.games && data.response.game_count > 0) {
                
                return data.response.games;
            } else {
                // Aucun utilisateur trouvé
                throw new Error("Aucun jeu trouvé avec cet ID.");
            }
        } catch (error) {
            console.error("Erreur lors de l'appel API:", error.message);
            throw error; // Relance l'erreur pour la gestion dans le composant
        }
    }

    async GetAchievementsByGameForUser(APIKEY, USERID, GAMEID) {
        try {
            const response = await fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${GAMEID}&key=${APIKEY}&steamid=${USERID}`, {
                method: 'GET', // L'API attend une requête GET
            });

            const data = await response.json();

            if (data) {
                
                return [data.playerstats.gameName,data.playerstats.achievements];
            } else {
                throw new Error("Aucun jeu trouvé avec cet ID.");
            }
        } catch (error) {
            console.error("Erreur lors de l'appel API:", error.message);
            throw error; // Relance l'erreur pour la gestion dans le composant
        }
    }
    

    async GetGameInfo(GAMEID) {
        try {
            const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${GAMEID}`);
            const data = await response.json();
   
            // Vérifier si la clé 'data' existe dans la réponse
            if (data[GAMEID]?.success) {
                return data[GAMEID].data.header_image;  // Accéder au nom du jeu
            } else {
                throw new Error("Aucun jeu trouvé avec cet ID.");
            }
        } catch (error) {
            console.error("Erreur lors de l'appel API:", error.message);
            throw error; // Relance l'erreur pour la gestion dans le composant
        }
    }
   

}

const ShtweamService = new SteamService();
export default ShtweamService;

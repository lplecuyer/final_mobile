class SteamService {
    async GetUser( stuff ) {
        try {
            const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${stuff.token}&steamids=${stuff.steam_id}`, {
                method: 'GET', 
            });

            const data = await response.json();

            if (data.response && data.response.players.length > 0) {
                
                return data.response.players[0]; 
            } else {
                
                throw new Error("Aucun utilisateur trouvé avec cet ID.");
            }
        } catch (error) {
            throw new Error(error.message || "Une erreur s'est produite lors de la récupération de l'utilisateur.");
        }
    }

    async GetAllSteamGames(APIKEY) {
        try {
            const response = await fetch(`https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${APIKEY}&max_results=1000`, {
                method: 'GET', 
            });

            const data = await response.json();

            if (data.response && data.response.apps.length > 0) {
                return data.response.apps
            } else {
                throw new Error("Aucun utilisateur trouvé avec cet ID.");
            }
        } catch (error) {
            console.error("Erreur lors de l'appel API1:", error.message);
            throw error; 
        }
    }

    async GetGamesForUser(APIKEY, USERID) {
        try {
            const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${APIKEY}&steamid=${USERID}&format=json`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.response.games && data.response.game_count > 0) {
                return data.response.games;
            } else {
                throw new Error("Aucun jeu trouvé avec cet utilisateur.");
            }
        } catch (error) {
            console.error("Erreur lors de l'appel API:", error.message);
            throw error;
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
    
            // Vérifie si le statut HTTP est 200
            if (!response.ok) {
                console.warn(`Impossible d'accéder au jeu ID: ${GAMEID}. Statut HTTP: ${response.status}`);
                return null; // Retourne null si l'accès est refusé ou si une autre erreur survient
            }
    
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.warn(`Réponse non JSON pour le jeu ID: ${GAMEID}`);
                return null; // Skip les jeux non disponibles
            }
    
            const data = await response.json();
    
            // Vérifie si le jeu a des données valides
            if (data[GAMEID]?.success) {
                return {
                    header_image: data[GAMEID].data.header_image,
                    name: data[GAMEID].data.name,
                };
            } else {
                console.warn(`Aucun jeu trouvé avec l'ID ${GAMEID}.`);
                return null; // Skip si le jeu est invalide
            }
        } catch (error) {
            console.error(`Erreur lors de l'appel API pour le jeu ID ${GAMEID}:`, error.message);
            return null; // Skip en cas d'erreur
        }
    }
    
    
   

}

const ShtweamService = new SteamService();
export default ShtweamService;

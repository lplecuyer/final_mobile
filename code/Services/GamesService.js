import { Game } from '../Models/Game.js'

class GamesService {

    
    async ImportGameIntoUserGame(UserGameInfos) {
        try {
            const response = await fetch("http://martha.jh.shawinigan.info/queries/insert-game-into-usergame/execute", {
                method: 'POST',
                body: JSON.stringify(UserGameInfos),
                headers: {
                    'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
                }
            }).then((r) => r.json());

            if (response.success) {
                console.log("Jeu importé dans Users Games : ", response.name);
                return true;
            } else {
                return false;
            }
        } 
        catch (error) {
            console.error("Erreur réseau ou serveur :", error);
            return false;
        }
    }

    async ImportGame(infos) {
        try {
            const response = await fetch("http://martha.jh.shawinigan.info/queries/insert-game/execute", {
                method: 'POST',
                body: JSON.stringify(infos),
                headers: {
                    'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
                }
            }).then((r) => r.json());
    
            if (response.success) {
                console.log("Jeu importé :", response.name);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Erreur réseau ou serveur :", error);
            return false;
        }
    }

    async GetGameNameById(game_id) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/select-game-by-id/execute", {
            method: 'POST',
            body: JSON.stringify(game_id),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        if (response.success){
            return response.data.name;
        } else {
            console.warn("something wrong happened");
        }
    }

    async GetAllGames() {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/select-all-games/execute", {
            method: 'POST',
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        if (response.success){
            return response.data;
        } else {
            console.warn("something wrong happened");
        }
    }
    
}
const GameService = new GamesService();
export default GameService;
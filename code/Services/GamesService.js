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
                console.warn("Erreur lors de l'import dans Users Games : ", response.message || response);
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
                console.warn("Erreur lors de l'import :", response.message || response);
                return false;
            }
        } catch (error) {
            console.error("Erreur réseau ou serveur :", error);
            return false;
        }
    }
    
}
const GameService = new GamesService();
export default GameService;
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
                return response.data;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Erreur réseau ou serveur :", error);
            return false;
        }
    }

    async GetGameById(steam_game_id) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/select-game-by-id/execute", {
            method: 'POST',
            body: JSON.stringify({ steam_game_id }),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        
        if (response.success){
            const game = response.data[0];
            return game;
        } else {
            console.warn("something wrong happened");
        }
        
    }

    async GetGame(id) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/select-game/execute", {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        
        if (response.success){
            const game = response.data[0];
            return game;
        } else {
            console.warn("something wrong happened");
        }
        
    }

    async GetGameByName(name) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/select-game-by-name/execute", {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        
        if (response.success){
            const game = response.data[0];
            return game;
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
    
    async RemoveGameFromUser(ids) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/delete-game/execute", {
            method: 'POST',
            body: JSON.stringify({ids}),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        if (response.success) {
            return response;
        } else {
            return false;
        }
    }

    async UserHasGame(ids) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/user-owns-game/execute", {
            method: 'POST',
            body: JSON.stringify({ids}),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        if (response.success && response.data.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async getGameStatus(ids) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/select-usersgames-status/execute", {
            method: 'POST',
            body: JSON.stringify({ids}),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        if (response.success && response.data.length > 0) {
            return response.data;
        } else {
            return false;
        }
    }

    async updateGameStatus(statusforgame) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/insert-usersgames-status/execute", {
            method: 'POST',
            body: JSON.stringify({statusforgame}),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        if (response.success) {
            return true;
        } else {
            return false;
        }
    }
}
const GameService = new GamesService();
export default GameService;
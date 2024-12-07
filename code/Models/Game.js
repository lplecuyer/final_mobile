export class Game {
    #id;

    constructor(id, name, image_url, steam_game_id) {
        this.id = id,
        this.name = name,
        this.image_url = image_url,
        this.steam_game_id = steam_game_id
    }

    get id() {
        return this.id;
    }
}
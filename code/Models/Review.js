export class Review {
    #id;

    constructor(id, title, description, user_id, game_id, rating) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.user_id = user_id,
        this.game_id = game_id,
        this.rating = rating
    }

    get id() {
        return this.id;
    }
}
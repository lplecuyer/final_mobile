export class Review {
    constructor({ id, title, description, user_id, rating }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.user_id = user_id;
        this.rating = rating;
    }
}

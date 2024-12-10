export class Comment {
    constructor({ id, user_id, review_id, comment }) {
        this.id = id || null;
        this.userId = user_id || null;
        this.reviewId = review_id || null;
        this.description = comment || 'Pas de commentaire';
    }
}
import { Review } from '../Models/Review.js'

class ReviewsService {

    #reviewsList = [];
    async GetAllReviewsForGame(game_id) {
        try {
            const response = await fetch("http://martha.jh.shawinigan.info/queries/select-all-reviews-for-game/execute", {
                method: 'POST',
                body: JSON.stringify({ game_id }),
                headers: {
                    'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
                }
            }).then((r) => r.json());

            if (response.success) {
                this.#reviewsList = [];
                const reviews = response.data;
                reviews.forEach((reviewData) => {
                    const review = new Review(reviewData)
                    this.#reviewsList.push(review)
                });
            } else {
                this.#reviewsList = [];
            }
        } catch (error) {
            console.error("Erreur réseau ou serveur :", error);
            return false;
        }

            return this.#reviewsList;
    }
}
const ReviewService = new ReviewsService();
export default ReviewService;
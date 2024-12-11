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

    async CreateReview(newReview) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/create-new-review/execute", {
            method: 'POST',
            body: JSON.stringify({ newReview }),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        if (response.success){
            return true;
        } else {
            return false;
        }
    }

    async GetReviewWriter(user_id) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/select-review-writer/execute", {
            method: 'POST',
            body: JSON.stringify({ user_id }),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        if (response.success){
            return response.data;
        } else {
            return false;
        }
    }

    async CheckIfUserOwnsGame(condition) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/check_user_owns_game/execute", {
            method: 'POST',
            body: JSON.stringify({ condition }),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        if (response.data && Array.isArray(response.data) && response.data.length > 0){
            return true;
        } else {
            return false;
        }
    }

    async UpdateReview(inputs) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/update-review/execute", {
            method: 'POST',
            body: JSON.stringify({ inputs }),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        console.log(response)

        if (response.success){
            return true;
        } else {
            return false;
        }
    }

    async DeleteReview(ids) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/delete-review/execute", {
            method: 'POST',
            body: JSON.stringify({ ids }),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
            }
        }).then((r) => r.json());

        console.log(response)

        if (response.success){
            return true;
        } else {
            return false;
        }
    }
}
const ReviewService = new ReviewsService();
export default ReviewService;
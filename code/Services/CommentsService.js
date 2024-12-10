import { Comment } from '../Models/Comment.js'

class CommentsService {
    // Récupérer les commentaires pour une revue
    #commentsList = [];
    async GetAllCommentsForReview(review_id) {
        try {
            const response = await fetch("http://martha.jh.shawinigan.info/queries/select-all-comments-for-reviews/execute", {
                method: 'POST',
                body: JSON.stringify({ review_id }),
                headers: {
                    'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
                }
            }).then((r) => r.json());

            if (response.success) {
                this.#commentsList = [];
                const comments = response.data;
                comments.forEach((commentData) => {
                    const comment = new Comment(commentData)
                    this.#commentsList.push(comment)
                });
            } else {
                this.#commentsList = [];
            }
        } catch (error) {
            console.error("Erreur réseau ou serveur :", error);
            return false;
        }
            return this.#commentsList;
    }

    async GetCommentWriter(user_id) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/select-comment-writer/execute", {
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

    // Ajouter un commentaire
    async addComment(newComment) {
        try {
            const response = await fetch("http://martha.jh.shawinigan.info/queries/create-new-comment/execute", {
                method: 'POST',
                body: JSON.stringify({ newComment }),
                headers: {
                    'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH',
                    'Content-Type': 'application/json',
                }
            }).then((r) => r.json());

            if (response.success) {
                return response.data;  // Retourne le commentaire ajouté
            } else {
                console.error("Échec de l'ajout du commentaire");
                return null;
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire :", error);
            return null;
        }
    }

    async UpdateComment(inputs) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/update-comment/execute", {
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
}

export default new CommentsService();

import { UserCredentials } from './UserCredentials.js'
import { User } from './User.js'

class AuthService {
    #currentUser = null // ATTENTION, à utiliser judicieusement

    async logIn(credentials) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/select-user-auth/execute", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
                         
            }
        }).then((r) => r.json());

        if (response.success && response.data.length == 1)  {
            const user = response.data[0];
            this.#currentUser = new User({ id: user.id, username: user.username });
        } else {
            this.#currentUser = null;
        }

        return this.#currentUser
    }
}

const service = new AuthService()
export default service
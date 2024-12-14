import { User } from '../Models/User.js'

class AuthService {
    static currentUser = null; // ATTENTION, à utiliser judicieusement

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
            this.currentUser = new User( user.id, user.username, user.pwd, user.token, user.steam_id );
        } else {
            this.currentUser = null;
        }

        return this.currentUser
    }

    async signUp(credentials) {
        const response = await fetch("http://martha.jh.shawinigan.info/queries/insert-user/execute", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'auth': 'c2h0d2VhbTp3aXY5MzROIzlCZkFH'
                         
            }
        }).then((r) => r.json());

        if (response.success)  {
            const user = response.data[0];
            return true;
        } else {
            return false;
        }

        return this.currentUser
    }

    async logout() {
        this.currentUser = null;
    }
}

const service = new AuthService()
export default service
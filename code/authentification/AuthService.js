import { UserCredentials } from './UserCredentials.js'
import { User } from './User.js'

const USERS = [
    new UserCredentials({ username: 'a', password: 'a' }),
    new UserCredentials({ username: 'b', password: 'b' }),
    new UserCredentials({ username: 'c', password: 'c' }),
]

class AuthService {
    #currentUser = null // ATTENTION, à utiliser judicieusement

    get currentUser() {
        return this.#currentUser
    }

    signUp(credentials) {
        const { username, password } = credentials
        const user = USERS.find((u) => u.username == username)

        if (!user)  {
            USERS.push(new UserCredentials({username, password}))
            this.#currentUser = new User( username )
        }

        return !!this.#currentUser
    }

    logIn(credentials) {
        const user = USERS.find((u) => u.matches(credentials))

        this.#currentUser = user ? new User(user.username) : null

        return !!this.#currentUser
    }

    logOut() {
        this.#currentUser = null
    }
}

const service = new AuthService()
export default service
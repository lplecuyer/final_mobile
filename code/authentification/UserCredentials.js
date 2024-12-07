import { User } from '../Models/User.js'

export class UserCredentials extends User {

    constructor({username, password}) {
        super(username)

        this.password = password
    }

    matches(credentials) {
        return this.username == credentials.username && this.password == credentials.password
    }
}
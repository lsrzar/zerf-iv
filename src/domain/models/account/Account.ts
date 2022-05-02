import { v4 as uuid } from 'uuid'
import validator from 'validator'
import { AccountValidationError as code} from '../../common/codes/ErrorCodes'

export class Account {
    private _id: string
    private _user: string
    private _name: string
    private _password: string
    private _email: string

    private constructor(user: string, name: string, password: string, email: string) {
        this._user = user
        this._name = name
        this._password = password
        this._email = email

        this._id = uuid()
        this.validate()
    }

    get id(): string {
        return this._id
    }

    get user(): string {
        return this._user
    }

    get name(): string {
        return this._name
    }

    get password(): string {
        return this._password
    }

    get email(): string {
        return this._email
    }

    validate() {
        if(/\s/.test(this._user)) {
            throw new Error(code.USER_CONTAINS_WHITESPACE_ERROR)
        }
        if(this._id.length === 0) {
            throw new Error(code.ID_REQUIRED_ERROR)
        }
        if(this._user.length === 0) {
            throw new Error(code.USER_REQUIRED_ERROR)
        }
        if(this._user.length < 3) {
            throw new Error(code.USER_INVALID_LENGTH_ERROR)
        }
        if(this._name.length === 0) {
            throw new Error(code.NAME_REQUIRED_ERROR)
        }
        if(this._name.length < 3) {
            throw new Error(code.NAME_INVALID_LENGTH_ERROR)
        }
        if(!validator.isStrongPassword(this._password)) {
            throw new Error(code.WEAK_PASSWORD_ERROR)
        }
        if(this._email.length === 0) {
            throw new Error(code.EMAIL_REQUIRED_ERROR)
        }
        if(!validator.isEmail(this._email)) {
            throw new Error(code.EMAIL_INVALID_ERROR)
        }
    }
    
    public static create(user: string, name: string, password: string, email: string): Account {
        const account = new Account(user, name, password, email)
        return account
    }

}
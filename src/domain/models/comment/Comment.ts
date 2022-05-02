import { v4 as uuid } from 'uuid'
import { Account } from '../account/Account'
import { CommentValidationError as err } from '../../common/codes/ErrorCodes'

export class Comment {
    private _id: string
    private _date: Date
    private _text: string
    private _account: Account
    private _approved: boolean

    constructor(text: string, account: Account) {
        this._text = text
        this._account = account
        this._approved = false

        this._id = uuid()
        this._date = new Date()
        this.validate()
    }

    
    get id(): string {
        return this._id
    }
    
    get date(): Date {
        return this._date
    }

    get text(): string {
        return this._text
    }

    get account(): Account {
        return this._account
    }

    get approved(): boolean {
        return this._approved
    }
    
    
    approve() {
        this._approved = true
    }
    
    reject() {
        this._approved = false
    }
    
    validate() {
        if(this.account === null || this.account === undefined) {
            throw new Error(err.ACCOUNT_REQUIRED_ERROR)
        }
        if(this._id.length === 0) {
            throw new Error(err.ID_REQUIRED_ERROR)
        }
        if(this._text.length === 0) {
            throw new Error(err.TEXT_REQUIRED_ERROR)
        }
        if(this._text.length < 3) {
            throw new Error(err.TEXT_INVALID_LENGTH_ERROR)
        }
    }
    
    public static create(text: string, account: Account) {
        return new Comment(text, account)
    }
}

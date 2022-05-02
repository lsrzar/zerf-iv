import { v4 as uuid } from 'uuid'
import { Account } from '../account/Account'
import { Comment } from '../comment/Comment'
import { ReviewValidationError as err} from '../../common/codes/ErrorCodes'

export class Review {
    private _id: string
    private _name: string
    private _text: string
    private _date: Date
    private _author: Account
    private _rating: number
    private _comments?: Comment[]

    private constructor(name: string, text: string, author: Account, rating: number) {
        this._name = name
        this._text = text
        this._author = author
        this._rating = rating
        this._comments = []

        this._id = uuid()
        this._date = new Date()
        this.validate()
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get text(): string {
        return this._text
    }

    get date(): Date {
        return this._date
    }

    get author(): Account {
        return this._author
    }

    get rating(): number {
        return this._rating
    }

    get comments(): Comment[] {
        return this._comments
    }

    validate() {
        if(this._id.length === 0) {
            throw new Error(err.ID_REQUIRED_ERROR)
        }
        if(this._name.length === 0) {
            throw new Error(err.NAME_REQUIRED_ERROR)
        }
        if(this._name.length < 3) {
            throw new Error(err.NAME_INVALID_LENGTH_ERROR)
        }
        if(this._text.length === 0) {
            throw new Error(err.TEXT_REQUIRED_ERROR)
        }
        if(this._text.length < 3) {
            throw new Error(err.TEXT_INVALID_LENGTH_ERROR)
        }
        if(this._author === undefined || this._author === null) {
            throw new Error(err.AUTHOR_REQUIRED_ERROR)
        }
        if(this._date === undefined || this._date === null) {
            throw new Error(err.DATE_REQUIRED_ERROR)
        }
        if(this._date.getFullYear() > (new Date().getFullYear() + 1)) {
            throw new Error(err.DATE_INVALID_ERROR)
        }
        if(this._rating < 1 || this._rating > 5) {
            throw new Error(err.RATING_INVALID_ERROR)
        }
    }

    public static create(name: string, text: string, author: Account, rating: number): Review {
        const review = new Review(name, text, author, rating)
        return review
    }

    public toString(): string {
        return `id: ${this._id}\nname: ${this._name}\ntext: ${this._text}\ndate: ${this._date.toISOString()}
                \nauthor: ${JSON.stringify(this._author)}\nrating: ${this._rating}\ncomments: ${JSON.stringify(this._comments)}`
    }
}

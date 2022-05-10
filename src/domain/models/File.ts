import { v4 as uuid } from 'uuid'
import { ErrorCodes as err } from '../common/codes/ErrorCodes'

export class File {
    private _id: string
    private _name: string
    private _createdAt: Date

    private constructor(name: string) {
        this._name = name
        this._id = uuid()
        this._createdAt = new Date()
        this.validate()
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get createdAt(): Date {
        return this._createdAt
    }

    private validate() {
        if(!this._name.includes('.')) {
            throw new Error(err.FILE_EXTENSION_REQUIRED)
        }
        if(this._name.length === 0 || this._name.includes('/')) {
            throw new Error(err.INVALID_FILE_NAME)
        }
    }

    public static create(name: string): File {
        return new File(name)
    }
}
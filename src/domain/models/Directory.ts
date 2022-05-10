import { v4 as uuid } from 'uuid';
import { File as fsFile } from '../models/File';
import { ErrorCodes as err } from '../common/codes/ErrorCodes';

export class Directory {
    private _id: string
    private _name: string
    private _parent?: Directory
    private _dirs: Directory[] = []
    private _files: fsFile[] = []
    private _route: string

    private constructor(name: string, parent?: Directory) {
        this._name = name
        this._parent = parent
        if(parent) {
            this._route = `${parent?.route}${name}/`
        } else {
            this._route = `${name}/`
        }
        this._id = uuid()
        this.validate()
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get dirs(): Directory[] {
        return this._dirs;
    }

    get files(): fsFile[] {
        return this._files;
    }

    get route(): string {
        return this._route;
    }

    get parent(): Directory {
        return this._parent;
    }

    get children(): Array<fsFile | Directory> {
        let children: Array<fsFile | Directory> = []
        this._dirs.forEach((dir: Directory) => {
            children.push(dir)
        })
        this._files.forEach((f: fsFile) => {
            children.push(f)
        })
        return children
    }

    private validate() {
        if(this._name.length === 0 || this._name.includes('/')) {
            throw new Error(err.INVALID_DIR_NAME);
        }
    }

    public static create(name: string, parent?: Directory): Directory {
        return new Directory(name, parent);
    }
}
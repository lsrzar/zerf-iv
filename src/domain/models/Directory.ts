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
        this._route = `${name}/`
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

    get children(): unknown[] {
        return [...this._dirs, ...this._files]
    }

    validate() {
        if(this._name.length === 0 || this._name.includes('/')) {
            throw new Error(err.INVALID_DIR_NAME);
        }
    }

    public static create(name: string, parent?: Directory): Directory {
        return new Directory(name, parent);
    }

    mkdir(dirName: string): void {
        const dir = Directory.create(dirName, this);
        this._dirs.push(dir);
        this._route = this._route + `${dirName}/`
    }

    cd(dirName: string): string {
        const dir = this._dirs.find(d => d.name === dirName);
        if(dirName === '..') {
            if(this._route === '~' || this._route === '~/') {
                this._route = '~/'
            } else {
                const lastDir = this.dirs.at(this.dirs.length - 1);
                this._route = this._route.replace(`${lastDir.name}/`, '');
            }
        } else {
            dir._route = dir.route
        }
        return this._route
    }

    ls(): string {
        return JSON.stringify(this.children)
    }

    pwd(): string {
        return this._route;
    }

    touch(fileName: string): fsFile {
        const file = fsFile.create(fileName);
        this._files.push(file);
        return file;
    }
}
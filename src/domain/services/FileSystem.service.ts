import { Directory } from "../models/Directory"
import { File as fsFile } from "../models/File"
import { ErrorCodes as err } from "../common/codes/ErrorCodes"

export class FileSystem {
    private readonly _root: Directory
    private _currentDir: Directory

    private constructor() {
        this._root = this.createRoot()
        this._currentDir = this._root
    }

    private createRoot(): Directory {
        const root = Directory.create("~")
        return root
    }

    public static create(): FileSystem {
        return new FileSystem()
    }

    mkdir(dirName: string) {
        this._currentDir.dirs.forEach((dir: Directory) => {
            if(dir.name === dirName) {
                throw new Error(err.DIRECTORY_ALREADY_EXISTS)
            }
        })
        const dir = Directory.create(dirName, this._currentDir)
        this._currentDir.dirs.push(dir)
    }

    cd(path: string) {
        if (path === '..') {
            if (this._currentDir.name === this._root.name) {
                this._currentDir = this._root
            } else {
                this._currentDir = this._currentDir.parent
            }
        } else {
            if(path.includes('/')) {
                const pathArr = path.split('/')
                let i = 0;
                if(pathArr.at(0).includes('~')) {
                    i = 1
                }
                for(i; i < pathArr.length; i++) {
                    this._currentDir.dirs.forEach((dir: Directory) => {
                        if(dir.name === pathArr[i]) {
                            this._currentDir = dir
                        } else {
                            throw new Error(err.INVALID_PATH)
                        }
                    })
                }
            } else {
                this._currentDir.dirs.forEach((dir: Directory) => {
                    if(dir.name === path) {
                        this._currentDir = dir
                    } else {
                        throw new Error(err.INVALID_PATH)
                    }
                })
            }
        }
    }

    ls(): string {
        let items = ''
        this._currentDir.children.forEach((item: fsFile | Directory) => {
            items = items.concat(`[${item.name}] `)
        })
        return items
    }

    pwd(): string {
        return this._currentDir.route
    }

    touch(fileName: string) {
        const file = fsFile.create(fileName)
        this._currentDir.files.push(file)
    }
}

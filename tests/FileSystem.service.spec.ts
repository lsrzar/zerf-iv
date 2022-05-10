import { FileSystem } from "../src/domain/services/FileSystem.service"

describe('[Service] File System Unit Tests: ', () => {
    let fs: FileSystem;
    
    beforeEach(() => {
        fs = FileSystem.create()
    })

    it(`should display the root directory '~/'`, () => {
        expect(fs.pwd()).toBe('~/')
    })

    it(`should add new directories: 'code' & 'uni'`, () => {
        fs.mkdir('code')
        fs.mkdir('uni')
        expect(fs.ls()).toContain('code uni')
    })

    it('should make a directory and navigate to it', () => {
        fs.mkdir('documents')
        fs.cd('documents')
        expect(fs.pwd()).toContain('documents/')
    })

    it(`should create a 'run.exe' file inside the 'downloads' directory`, () => {
        fs.mkdir('downloads')
        fs.cd('downloads')
        fs.touch('run.exe')
        expect(fs.ls()).toContain('run.exe')
    })

    it(`should return to root directory after all commands`, () => {
        fs.mkdir('users')
        fs.cd('users')
        fs.mkdir('admin')
        fs.cd('admin')
        fs.touch('text.txt')
        fs.cd('..')
        fs.cd('..')
        expect(fs.pwd()).toBe('~/')
    })

    it(`should include root, users, and downloads in its path`, () => {
        fs.mkdir('users')
        fs.cd('users')
        fs.mkdir('downloads')
        fs.cd('downloads')
        fs.mkdir('photos')
        fs.cd('photos')
        fs.cd('..')
        fs.cd('..')
        fs.cd('..')
        fs.cd('~/users/downloads/photos/')
        expect(fs.pwd()).toBe('~/users/downloads/photos/')
    })

    it(`should stay in root directory`, () => {
        fs.cd('..')
        expect(fs.pwd()).toBe('~/')
    })

    it(`should throw error when creating two directories with identical names`, () => {
        expect(() => {
            fs.mkdir('folder')
            fs.mkdir('folder')
        }).toThrowError
    })
})
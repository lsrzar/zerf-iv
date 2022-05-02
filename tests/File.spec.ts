import { File as fsFile } from '../src/domain/models/File';
import { ErrorCodes as err } from '../src/domain/common/codes/ErrorCodes';

describe('[Entity] File Unit Tests', () => {
    const fileName = "testFile.txt"
    const invalidFileName = "test/File.txt"
    const noExtensionFileName = "testFile"

    it('should create a file', () => {
        const file = fsFile.create(fileName)
        expect(file.name).toBe(fileName)
    })

    it('should throw an error when creating a file with an invalid name', () => {
        expect(() => fsFile.create(invalidFileName)).toThrowError(err.INVALID_FILE_NAME)
    })

    it('should throw an error when creating a file with no extension', () => {
        expect(() => fsFile.create(noExtensionFileName)).toThrowError(err.FILE_EXTENSION_REQUIRED)
    })
})
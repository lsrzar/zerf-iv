import { Directory } from "../src/domain/models/Directory";
import { ErrorCodes as err } from "../src/domain/common/codes/ErrorCodes";

describe("[Entity] Directory Unit Tests", () => {
    const dirName = "testDir"
    const invalidDirName = "test/Dir"
    const fsDir = Directory.create("~")

    it("should create a directory", () => {
        const dir = Directory.create(dirName)
        expect(dir.name).toBe(dirName)
    })

    it("should throw an error when creating a directory with an invalid name", () => {
        expect(() => Directory.create(invalidDirName)).toThrowError(err.INVALID_DIR_NAME)
    })

    it(`should show route as ${dirName}/`, () => {
        const dir = Directory.create(dirName)
        expect(dir.route).toBe(`${dirName}/`)
    })

    it(`should show no children (file or directory)`, () => {
        const dir = Directory.create(dirName)
        expect(dir.children).toEqual([])
    })

    it(`should create a directory and add it to pwd`, () => {
        fsDir.mkdir(dirName)
        expect(fsDir.route).toContain(dirName)
    })

    it(`should create a file and add it to the parent`, () => {
        const fileName = "testFile.txt"
        fsDir.touch(fileName)
        expect(fsDir.ls()).toContain(fileName)
    })

    it(`should return to the root directory`, () => {
        fsDir.mkdir(dirName)
        fsDir.cd('..')
        expect(fsDir.pwd()).toBe("~/")
    })

    it(`should add a file to current directory`, () => {
        const fileName = "testFile.txt"
        fsDir.touch(fileName)
        expect(fsDir.ls()).toContain(fileName)
    })
})
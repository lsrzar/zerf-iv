import { Directory } from "../src/domain/models/Directory";
import { ErrorCodes as err } from "../src/domain/common/codes/ErrorCodes";

describe("[Entity] Directory Unit Tests", () => {
    const invalidDirName = "test/Dir"
    const dirName = "testDir"
    const fsDir = Directory.create("~")

    it("should create a directory", () => {
        const dir = Directory.create(dirName)
        expect(dir.name).toBe(dirName)
    })

    it("should throw an error when creating a directory with an invalid name", () => {
        expect(() => Directory.create(invalidDirName)).toThrowError(err.INVALID_DIR_NAME)
    })

    it(`should show route as ${dirName}/`, () => {
        const dir = Directory.create(dirName, fsDir)
        expect(dir.route).toBe(`~/${dirName}/`)
    })

    it(`should show no children (file or directory)`, () => {
        const dir = Directory.create(dirName, fsDir)
        expect(dir.children).toEqual([])
    })
})
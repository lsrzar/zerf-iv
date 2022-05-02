/* eslint-disable @typescript-eslint/no-unused-vars */
import { Comment } from '../../src/domain/models/comment/Comment'
import { Account } from '../../src/domain/models/account/Account'
import { CommentValidationError as err } from '../../src/domain/common/codes/ErrorCodes'

// text account approved
describe('[Entity] Comment Unit Tests', () => {
    const props = {
        text: {
            valid: "Some comment",
            short: "co",
        }
    } as const;
    const account = Account.create("validuser123", "Valid Name", "StrnGPASworD341!", "valid@email.com")

    // Valid comment
    it(`should create comment with text: ${props.text.valid}`, () => {
        const comment = Comment.create(props.text.valid, account)
        expect(comment.text).toBe(props.text.valid)
    })

    // Invalid comment
    it("should throw error on comment length less than 3", () => {
        expect(() => {
            const comment = Comment.create(props.text.short, account)
        }).toThrow(new Error(err.TEXT_INVALID_LENGTH_ERROR))
    })

    // Comment without account
    it("should throw error on comment without account", () => {
        expect(() => {
            const comment = Comment.create(props.text.valid, null)
        }).toThrow(new Error(err.ACCOUNT_REQUIRED_ERROR))
    })
})
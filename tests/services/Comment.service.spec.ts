import { Comment } from "../../src/domain/models/comment/Comment";
import { Account } from "../../src/domain/models/account/Account";
import { Review } from "../../src/domain/models/review/Review";
import { CommentService as cs } from "../../src/domain/service/Comment.service";
import { ReviewValidationError as err } from "../../src/domain/common/codes/ErrorCodes";

describe("[Service] Comment Service Unit Tests", () => {
    const account = Account.create("validuser123", "Valid Name", "StrnGPASworD341!", "valid@email.com")
    const review = Review.create("Good review", "This is a good review", account, 5)
    const comment = Comment.create("I agree, this is a good product", account)

    // Add comment
    it("should create comment", () => {
        expect(comment.text).toBe("I agree, this is a good product")
        cs.add(review, comment)
        expect(review.comments.length).toBe(1)
        expect(review.comments).toContain(comment)
    })

    // Add same comment twice
    it("should throw error on comment already exists", () => {
        expect(() => {
            cs.add(review, comment)
            cs.add(review, comment)
        }).toThrow(new Error(err.COMMENT_ALREADY_EXISTS))
    })

    // Approve comment
    it("should approve comment", () => {
        cs.approveComment(review, comment)
        expect(comment.approved).toBe(true)
    })

    // Reject comment
    it("should reject comment", () => {
        cs.rejectComment(review, comment)
        expect(comment.approved).toBe(false)
    })

    // Delete comment
    it("should delete comment", () => {
        cs.deleteComment(review, comment)
        expect(review.comments.length).toBe(0)
    })
})
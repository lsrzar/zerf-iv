import { Review } from "../models/review/Review";
import { Comment } from "../models/comment/Comment";
import { ReviewValidationError as err } from "../common/codes/ErrorCodes";

export class CommentService {
    static add(review: Review, comment: Comment): void {
        review.comments.forEach(c => {
            if(c.id === comment.id) {
                throw new Error(err.COMMENT_ALREADY_EXISTS)
            }
        })
        review.comments.push(comment)
    }

    static approveComment(review: Review, comment: Comment): void {
        review.comments.forEach(c => {
            if(c.id === comment.id) {
                c.approve()
            }
        })
    }

    static rejectComment(review: Review, comment: Comment): void {
        review.comments.forEach(c => {
            if(c.id === comment.id) {
                c.reject()
            }
        })
    }

    static deleteComment(review: Review, comment: Comment): void {
        review.comments.forEach((c, index) => {
            if(c.id === comment.id) {
                review.comments.splice(index, 1)
            }
        })
    }
}
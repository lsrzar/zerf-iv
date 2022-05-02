/* eslint-disable @typescript-eslint/no-unused-vars */
import { Review } from "../../src/domain/models/review/Review";
import { Account } from "../../src/domain/models/account/Account";
import { ReviewValidationError as err } from "../../src/domain/common/codes/ErrorCodes";

describe("[Entity] Review Unit Tests:", () => {
    const props = {
        name: {
            valid: "Valid Name",
            short: "in",
        },
        text: {
            valid: "Valid Text",
            short: "in",
        },
        rating: {
            valid: 2,
            invalid: 0
        }
    } as const;

    const account = Account.create("validuser123", "Valid Name", "StrnGPASworD341!", "valid@email.com")
    // All props are valid
    it(`should show name: ${props.name.valid}`, () => {
        const review = Review.create(props.name.valid, props.text.valid, account, props.rating.valid)
        expect(review.name).toBe(props.name.valid)
    });

    // Name length is less than 3
    it("should throw error on name length less than 3", () => {
        expect(() => {
            const review = Review.create(props.name.short, props.text.short, account, props.rating.valid)
        }).toThrow(new Error(err.NAME_INVALID_LENGTH_ERROR))
    });

    // Name required
    it("should throw error on name required", () => {
        expect(() => {
            const review = Review.create("", props.text.short, account, props.rating.valid);
        }).toThrow(new Error(err.NAME_REQUIRED_ERROR))
    });

    // Text is valid
    it(`should show text: ${props.text.valid}`, () => {
        const review = Review.create(props.name.valid, props.text.valid, account, props.rating.valid);
        expect(review.text).toBe(props.text.valid)
    });

    // Text length is less than 3
    it("should throw error on text length less than 3", () => {
        expect(() => {
            const review = Review.create(props.name.valid, props.text.short, account, props.rating.valid)
        }).toThrow(new Error(err.TEXT_INVALID_LENGTH_ERROR))
    });

    // Text required
    it("should throw error on text required", () => {
        expect(() => {
            const review = Review.create(props.name.valid, "", account, props.rating.valid)
        }).toThrow(new Error(err.TEXT_REQUIRED_ERROR))
    })
})
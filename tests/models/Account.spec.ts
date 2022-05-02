/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from '../../src/domain/models/account/Account'
import { AccountValidationError as err} from '../../src/domain/common/codes/ErrorCodes'

describe("[Entity] Account Unit Tests:", () => {
    const props = {
        user: {
            valid: 'validuser123',
            whitespace: 'invalid user',
            short: "in"
        },
        name: {
            valid: 'Valid Name',
            short: 'in',
        },
        password: {
            valid: '#StrngPwd!@8844',
            invalid: 'inv',
        },
        email: {
            valid: 'valid@email.com',
            invalid: 'invalid email',
        },
    } as const

    // User is valid
    it(`should show user: ${props.user.valid}`, () => {
        const account = Account.create(props.user.valid, props.name.valid, props.password.valid, props.email.valid)
        expect(account.user).toBe(props.user.valid)
    })

    // User has whitespace
    it("should throw error on whitespace in user", () => {
        expect(() => {
            const account = Account.create("user with whitespace", "Name", "StrnGPASworD341!", "user@name.com")
        }).toThrow(new Error(err.USER_CONTAINS_WHITESPACE_ERROR))
    })

    // User length is less than 3
    it("should throw error on user length less than 3", () => {
        expect(() => {
            const account = Account.create(props.user.short, props.name.valid, props.password.valid, props.email.valid)
        }).toThrow(new Error(err.USER_INVALID_LENGTH_ERROR))
    })

    // User required
    it("should throw error on user required", () => {
        expect(() => {
            const account = Account.create("", props.name.valid, props.password.valid, props.email.valid)
        }).toThrow(new Error(err.USER_REQUIRED_ERROR))
    })
    
    // Name length is less than 3
    it("should throw error on name length less than 3", () => {
        expect(() => {
            const account = Account.create(props.user.valid, props.name.short, props.password.valid, props.email.valid)
        }).toThrow(new Error(err.NAME_INVALID_LENGTH_ERROR))
    })

    // Weak password
    it("should throw error on weak password", () => {
        expect(() => {
            const account = Account.create(props.user.valid, props.name.valid, props.password.invalid, props.email.valid)
        }).toThrow(new Error(err.WEAK_PASSWORD_ERROR))
    })

    // Email required
    it("should throw error empty email", () => {
        expect(() => {
            const account = Account.create(props.user.valid, props.name.valid, props.password.valid, "")
        }).toThrow(new Error(err.EMAIL_REQUIRED_ERROR))
    })
    
    // Invalid email
    it("should throw error on invalid email", () => {
        expect(() => {
            const account = Account.create(props.user.valid, props.name.valid, props.password.valid, props.email.invalid)
        }).toThrow(new Error(err.EMAIL_INVALID_ERROR))
    })

    // Valid email
    it("should create account with valid email", () => {
        const account = Account.create(props.user.valid, props.name.valid, props.password.valid, props.email.valid)
        expect(account.email).toBe(props.email.valid)
    })
})

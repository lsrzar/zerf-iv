export enum AccountValidationError {
    USER_CONTAINS_WHITESPACE_ERROR = 'User cannot contain whitespace',
    ID_REQUIRED_ERROR = 'An ID is required',
    USER_REQUIRED_ERROR = 'A user is required',
    USER_INVALID_LENGTH_ERROR = 'User must be at least 3 characters long',
    NAME_REQUIRED_ERROR = 'A name is required',
    NAME_INVALID_LENGTH_ERROR = 'Name must be at least 3 characters long',
    WEAK_PASSWORD_ERROR = 'Password must be at least 8 characters long and contain at least one number',
    EMAIL_INVALID_ERROR = 'Email is invalid',
    EMAIL_REQUIRED_ERROR = 'Email is required',
}

export enum ReviewValidationError {
    ID_REQUIRED_ERROR = 'An ID is required',
    NAME_REQUIRED_ERROR = 'A name is required',
    NAME_INVALID_LENGTH_ERROR = 'Name must be at least 3 characters long',
    TEXT_REQUIRED_ERROR = 'A text is required',
    TEXT_INVALID_LENGTH_ERROR = 'Text must be at least 3 characters long',
    DATE_REQUIRED_ERROR = 'A date is required',
    DATE_INVALID_ERROR = 'Date must be in the past',
    AUTHOR_REQUIRED_ERROR = 'An author is required',
    RATING_REQUIRED_ERROR = 'A rating is required',
    RATING_INVALID_ERROR = 'Rating must be between 1 and 5',
    COMMENT_ALREADY_EXISTS = 'Comment already exists',
}

export enum CommentValidationError {
    ID_REQUIRED_ERROR = 'An ID is required',
    TEXT_REQUIRED_ERROR = 'A text is required',
    TEXT_INVALID_LENGTH_ERROR = 'Text must be at least 3 characters long',
    ACCOUNT_REQUIRED_ERROR = 'An account is required',
}
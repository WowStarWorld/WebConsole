CLASSES = {};
EXCEPTIONS = {};


EXCEPTIONS.CommandParseError = (
    class CommandParseError extends Error {
        constructor(message) {
            super(message);
            this.name = 'CommandParseError',
                Error.captureStackTrace(this, this.constructor);
        };
    }
);
EXCEPTIONS.CommandNotFoundError = (
    class CommandNotFoundError extends Error {
        constructor(message) {
            super(message);
            this.name = 'CommandNotFoundError',
                Error.captureStackTrace(this, this.constructor);
        };
    }

);
EXCEPTIONS.StackOverflowError = (
    class StackOverflowError extends Error {
        constructor(message) {
            super(message)
            this.name = 'StackOverflowError',
                Error.captureStackTrace(this, this.constructor);
        };
    }
);
EXCEPTIONS.IOErrror = (
    class IOErrror extends Error {
        constructor(message) {
            super(message)
            this.name = 'IOErrror',
                Error.captureStackTrace(this, this.constructor);
        };
    }
);

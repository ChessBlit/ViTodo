import { NextResponse } from "next/server";

class ApiError extends Error {
    constructor(status, message = "Something went wrong", field = "", errors = [], stack = "") {
        super(message);
        this.message = message;
        this.status = status;
        this.data = null;
        this.success = false;
        this.errors = errors;
        this.field = field;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toNextResponse() {
        return NextResponse.json(
            {
                success: false,
                message: this.message,
                field: this.field,
                errors: this.errors,
                status: this.status
            },
        );
    }
}

export { ApiError };

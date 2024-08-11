//your code here
// Custom error classes
class OutOfRangeError extends Error {
    constructor(arg) {
        super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
        this.name = "OutOfRangeError";
    }
}

class InvalidExprError extends Error {
    constructor() {
        super("Expression should not have an invalid combination of expression");
        this.name = "InvalidExprError";
    }
}

// Function to evaluate the string expression
function evalString(expression) {
    try {
        // Remove spaces from the expression
        expression = expression.replace(/\s+/g, '');

        // Check for invalid characters
        if (/[^0-9+\-*/]/.test(expression)) {
            const invalidChar = expression.match(/[^0-9+\-*/]/)[0];
            throw new OutOfRangeError(invalidChar);
        }

        // Check if expression starts with +, /, or *
        if (/^[*/+]/.test(expression)) {
            throw new SyntaxError("Expression should not start with invalid operator");
        }

        // Check if expression ends with +, /, *, or -
        if (/[*/+\-]$/.test(expression)) {
            throw new SyntaxError("Expression should not end with invalid operator");
        }

        // Check for invalid combinations of operators (e.g., ++, --, **, //, etc.)
        if (/[*\-+/]{2,}/.test(expression)) {
            throw new InvalidExprError();
        }

        // If all checks pass, evaluate the expression
        return eval(expression);
    } catch (error) {
        // Catch and rethrow the error
        if (error instanceof OutOfRangeError || error instanceof InvalidExprError || error instanceof SyntaxError) {
            throw error;
        } else {
            // Handle any other errors that may arise during evaluation
            throw new Error("An unexpected error occurred: " + error.message);
        }
    }
}

// Example usage
try {
    const result = evalString("10 + 20 / 5");
    console.log("Result:", result);
} catch (error) {
    console.error(error.name + ": " + error.message);
}

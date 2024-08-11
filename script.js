function evaluateExpression() {
      const input = document.getElementById('input1').value;

      try {
        const result = evalString(input);
        alert('Result: ' + result);
      } catch (e) {
        if (e.name === 'OutOfRangeError' || e.name === 'InvalidExprError') {
          alert('Evaluation failed: ' + e.message);
        } else {
          alert('An unexpected error occurred.');
        }
      }
    }

    function evalString(expression) {
      // This is where the expression evaluation logic would go.
      // For now, it's a placeholder to demonstrate error handling.
      if (/[^0-9+\-*/\s]/.test(expression)) {
        const invalidChar = expression.match(/[^0-9+\-*/\s]/)[0];
        throw new OutOfRangeError(invalidChar);
      }

      if (/[\+\-\*\/]{2,}/.test(expression)) {
        throw new InvalidExprError();
      }

      if (/^[+\/*]/.test(expression)) {
        throw new SyntaxError("Expression should not start with invalid operator");
      }

      if (/[\+\-\*\/]$/.test(expression)) {
        throw new SyntaxError("Expression should not end with invalid operator");
      }

      return eval(expression); // Use caution with eval in production code.
    }

    class OutOfRangeError extends Error {
      constructor(invalidChar) {
        super(`Expression should only consist of integers and +-/* characters and not '${invalidChar}'`);
        this.name = 'OutOfRangeError';
      }
    }

    class InvalidExprError extends Error {
      constructor() {
        super('Expression should not have an invalid combination of operators');
        this.name = 'InvalidExprError';
      }
    }
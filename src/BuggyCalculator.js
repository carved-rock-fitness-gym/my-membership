// Intentionally buggy calculator for testing BugBot detection
export class BuggyCalculator {
    // Bug 1: Division by zero not handled
    divide(a, b) {
        return a / b; // Should check if b === 0
    }

    // Bug 2: No input validation
    calculate(operation, x, y) {
        switch (operation) {
            case 'add':
                return x + y;
            case 'subtract':
                return x - y;
            case 'multiply':
                return x * y;
            case 'divide':
                return this.divide(x, y); // No validation that x,y are numbers
            default:
                return null; // Should throw error or handle properly
        }
    }

    // Bug 3: Array access without bounds checking
    getAverage(numbers) {
        let sum = 0;
        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        return sum / numbers.length; // What if numbers.length === 0?
    }

    // Bug 4: Potential memory leak - event listener not cleaned up
    startCalculations() {
        const button = document.getElementById('calc-button');
        button.addEventListener('click', () => {
            // Memory leak: listener never removed
            this.performCalculation();
        });
    }

    // Bug 5: SQL injection vulnerability simulation
    searchCalculations(query) {
        // Simulated SQL query - would be vulnerable to injection
        const sql = `SELECT * FROM calculations WHERE name = '${query}'`;
        console.log('Executing:', sql); // BugBot should flag this
        return sql;
    }
}
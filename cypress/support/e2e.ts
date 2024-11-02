// Import commands.js using ES2015 syntax:
import './commands'

// Prevent TypeScript errors when accessing cy.* commands
declare global {
	namespace Cypress {
		interface Chainable {
			// Add custom command types here if needed
		}
	}
}

// Add any global configuration, event listeners, or other setup here
beforeEach(() => {
	// Reset any test state before each test
})

// You can add global before/after hooks here if needed

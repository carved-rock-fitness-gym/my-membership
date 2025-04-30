// This file contains intentional ESLint errors for testing
import React from 'react'

// Unused variable (will trigger no-unused-vars rule)
const unusedVar = 'This variable is never used';

// Console statement (often flagged in production code)
function TestComponent(props) {
    // Console statement (will trigger no-console rule)
    console.log('This is a test component');
    
    // Return JSX with props without validation (will trigger react/prop-types rule)
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>
    )
}

export default TestComponent;

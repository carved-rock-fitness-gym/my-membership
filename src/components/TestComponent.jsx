// This file contains intentional ESLint errors for testing
import React from 'react'

// Unused variable (will trigger no-unused-vars rule)
const unusedVar = 'This variable is never used';

// Missing prop types (will trigger react/prop-types rule)
export default function TestComponent(props) {
    // Console statement (often flagged in production code)
    console.log('This is a test component');
    
    // Return JSX with props without validation
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>
    )
}

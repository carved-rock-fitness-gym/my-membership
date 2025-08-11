// Fixed linting issues - 2025-04-30
// This component has line length issues and missing semicolons
import { useState } from 'react'  // Missing semicolon

const WorkoutCard = ({ workout, onSave }) => {
    const [completed, setCompleted] = useState(workout.completed || false)
    const [feedback, setFeedback] = useState('')  // Missing semicolon
    
    const difficultyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"]
    
    const handleSubmit = () => {
        onSave({ ...workout, completed, feedback, lastModified: new Date().toISOString() })  // This line is intentionally too long and will trigger the max-len rule in ESLint
    }
    
    return (
        <div className="workout-card">
            <h3>{workout.name}</h3>
            <div className="workout-details">
                <div>Duration: {workout.duration} minutes</div>
                <div>Difficulty: {difficultyLevels[workout.difficulty]}</div>
                <div>Target Muscle Groups: {workout.targetMuscles.join(', ')}</div>
                <div>Calories Burned: {workout.calories}</div>
                <div className="description">Description: {workout.description}</div>
            </div>
            <div className="workout-tracker">
                <label>
                    <input 
                        type="checkbox" 
                        checked={completed} 
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                    Completed
                </label>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Add feedback or notes..."
                    className="feedback-input"
                />
                <button onClick={handleSubmit} className="save-button">
                    Save Workout Progress
                </button>
            </div>
        </div>
    )
}

export default WorkoutCard;
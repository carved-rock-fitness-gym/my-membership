// Fixed linting issues - 2025-04-29
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
                    Mark as Completed
                </label>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="How was your workout? Leave some feedback here to help track your progress over time and make adjustments to your fitness routine based on what works best for your body and goals."  // Line too long
                />
                <button onClick={handleSubmit}>Save Progress</button>
            </div>
        </div>
    )  // Missing semicolon
}

export default WorkoutCard

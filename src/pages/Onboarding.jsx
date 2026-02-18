import { useState } from 'react'
import { useUser } from '../context/UserContext'
import Button from '../components/Button'
import { generateDailyPlan } from '../services/ai'

const WORKOUT_TYPES = [
    { id: 'gym', label: 'Gym', icon: '🏋️' },
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'running', label: 'Running', icon: '🏃' },
    { id: 'yoga', label: 'Yoga', icon: '🧘' },
    { id: 'calisthenics', label: 'Calisthenics', icon: '🤸' },
    { id: 'mixed', label: 'Mixed', icon: '🔄' }
]

export default function Onboarding() {
    const { completeOnboarding, setTodayPlan } = useUser()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    // Form state - now with freeform text
    const [goal, setGoal] = useState('')
    const [workoutType, setWorkoutType] = useState(null)
    const [duration, setDuration] = useState(30)
    const [constraints, setConstraints] = useState('')

    const canProceed = () => {
        if (step === 1) return goal.trim().length > 0
        if (step === 2) return workoutType !== null
        return true
    }

    const handleNext = async () => {
        if (step < 3) {
            setStep(step + 1)
        } else {
            // Complete onboarding and generate plan
            setLoading(true)

            const userData = {
                goal: goal.trim(),
                workoutType,
                duration,
                constraints: constraints.trim(),
                experience: constraints.toLowerCase().includes('beginner') ? 'beginner' : 'intermediate'
            }

            try {
                // Generate initial plan
                const plan = await generateDailyPlan(userData)
                setTodayPlan(plan)
            } catch (error) {
                console.error('Failed to generate plan:', error)
                // Set a fallback plan if AI fails
                setTodayPlan(getFallbackPlan(userData))
            }

            completeOnboarding(userData)
        }
    }

    const getFallbackPlan = (user) => ({
        workout: {
            title: `${user.duration}-Minute ${WORKOUT_TYPES.find(w => w.id === user.workoutType)?.label || 'Workout'}`,
            personalization: 'Customized for your goals',
            duration: user.duration,
            exercises: [
                { name: 'Warm-up', detail: '5 min light cardio' },
                { name: 'Main workout', detail: 'Full body circuit' },
                { name: 'Cool down', detail: '5 min stretching' }
            ]
        },
        meals: {
            breakfast: { name: 'Protein Oatmeal', desc: 'Oats, banana, protein powder' },
            lunch: { name: 'Grilled Chicken Salad', desc: 'Mixed greens, chicken, olive oil' },
            dinner: { name: 'Salmon with Vegetables', desc: 'Baked salmon, steamed broccoli' },
            snacks: { name: 'Greek Yogurt', desc: 'With berries and honey' }
        },
        recovery: {
            suggestion: 'Start your day with 10 minutes of morning sunlight',
            reason: 'Helps regulate your circadian rhythm and boost energy',
            icon: '☀️'
        }
    })

    return (
        <div className="onboarding">
            {/* Progress indicators */}
            <div className="onboarding-progress">
                {[1, 2, 3].map(i => (
                    <div
                        key={i}
                        className={`progress-dot ${i === step ? 'active' : ''} ${i < step ? 'completed' : ''}`}
                    />
                ))}
            </div>

            <div className="onboarding-content">
                {/* Step 1: Goal - Freeform text */}
                {step === 1 && (
                    <>
                        <h1 className="onboarding-title">What's your health goal?</h1>
                        <p className="onboarding-subtitle">
                            Describe what you want to achieve in your own words
                        </p>

                        <div className="text-input-container">
                            <textarea
                                className="text-input"
                                placeholder="e.g., Lose 10 pounds, build muscle for summer, improve my running endurance, recover from knee surgery..."
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                rows={4}
                            />
                        </div>

                        <div className="text-muted" style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
                            💡 Be as specific as you like — our AI coach will personalize everything for you.
                        </div>
                    </>
                )}

                {/* Step 2: Workout Type + Duration */}
                {step === 2 && (
                    <>
                        <h1 className="onboarding-title">How do you train?</h1>
                        <p className="onboarding-subtitle">
                            Choose your preferred workout style and time
                        </p>

                        <div className="tile-grid">
                            {WORKOUT_TYPES.map(w => (
                                <div
                                    key={w.id}
                                    className={`tile ${workoutType === w.id ? 'selected' : ''}`}
                                    onClick={() => setWorkoutType(w.id)}
                                >
                                    <div className="tile-icon">{w.icon}</div>
                                    <div className="tile-label">{w.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="slider-container">
                            <div className="slider-label">
                                <span>Time available</span>
                                <span className="slider-value">{duration} minutes</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="60"
                                step="5"
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                            />
                        </div>
                    </>
                )}

                {/* Step 3: Constraints - Freeform text */}
                {step === 3 && (
                    <>
                        <h1 className="onboarding-title">Any limitations?</h1>
                        <p className="onboarding-subtitle">
                            Tell us about injuries, restrictions, or preferences (optional)
                        </p>

                        <div className="text-input-container">
                            <textarea
                                className="text-input"
                                placeholder="e.g., Bad knees from old injury, can't do push-ups, vegetarian, limited equipment at home, I'm a complete beginner..."
                                value={constraints}
                                onChange={(e) => setConstraints(e.target.value)}
                                rows={4}
                            />
                        </div>

                        <div className="text-muted" style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
                            🛡️ We'll make sure your plans work around any limitations.
                        </div>
                    </>
                )}

                {/* Actions */}
                <div className="onboarding-actions">
                    {loading ? (
                        <div className="loading">
                            <div className="loading-spinner"></div>
                            <span>Creating your personalized plan...</span>
                        </div>
                    ) : (
                        <Button
                            variant="primary"
                            size="large"
                            fullWidth
                            onClick={handleNext}
                            disabled={!canProceed()}
                        >
                            {step === 3 ? 'Create My Plan' : 'Continue'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

import { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import Card from '../components/Card'
import Button from '../components/Button'
import { generateDailyPlan } from '../services/ai'

export default function Home({ onNavigate, onOpenSettings }) {
    const {
        userData,
        getCurrentPlan,
        setPlanForDate,
        dateOffset,
        goToNextDay,
        goToPrevDay,
        goToToday,
        getDateString,
        markWorkoutComplete,
        markWorkoutSkipped,
        addToMealHistory
    } = useUser()

    const [workoutCompleted, setWorkoutCompleted] = useState(false)

    const [loading, setLoading] = useState(false)
    const [showAllExercises, setShowAllExercises] = useState(false)
    const currentPlan = getCurrentPlan()

    // Generate plan for this date if we don't have one
    // Also triggers when plans are cleared (e.g., after changing settings)
    const plansKey = JSON.stringify(Object.keys(userData.plans || {}))
    useEffect(() => {
        if (!currentPlan && userData.isOnboarded && !loading) {
            loadPlanForDate()
        }
    }, [dateOffset, userData.isOnboarded, plansKey])

    const loadPlanForDate = async () => {
        setLoading(true)
        try {
            const plan = await generateDailyPlan(userData, dateOffset)
            setPlanForDate(plan, dateOffset)
        } catch (error) {
            console.error('Failed to generate plan:', error)
            // Set fallback plan
            setPlanForDate(getFallbackPlan(), dateOffset)
        }
        setLoading(false)
    }

    // Force regenerate plan (for when fallback is shown)
    const regeneratePlan = async () => {
        setLoading(true)
        try {
            const plan = await generateDailyPlan(userData, dateOffset)
            setPlanForDate(plan, dateOffset)
        } catch (error) {
            console.error('Failed to regenerate plan:', error)
            alert('Failed to generate plan. Check browser console for API errors.')
        }
        setLoading(false)
    }

    const getFallbackPlan = () => ({
        workout: {
            title: `${userData.duration}-Minute Workout`,
            personalization: 'Customized for your goals',
            duration: userData.duration || 30,
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

    // Check if this is a fallback plan
    const isFallbackPlan = currentPlan?.workout?.personalization === 'Customized for your goals'

    if (loading || !currentPlan) {
        return (
            <div className="page">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <span>Generating plan for {getDateString()}...</span>
                </div>
            </div>
        )
    }

    const { workout, meals } = currentPlan
    const exercisesToShow = showAllExercises ? workout.exercises : workout.exercises?.slice(0, 3)

    return (
        <div className="page">
            {/* Date Navigator */}
            <div className="date-nav">
                <button className="date-nav-btn" onClick={goToPrevDay}>
                    ←
                </button>
                <div className="date-nav-center">
                    <span className="date-nav-label">
                        {dateOffset === 0 ? 'Today' : dateOffset === 1 ? 'Tomorrow' : dateOffset === -1 ? 'Yesterday' : getDateString()}
                    </span>
                    <span className="date-nav-date">{getDateString()}</span>
                </div>
                <button className="date-nav-btn" onClick={goToNextDay}>
                    →
                </button>
            </div>

            {dateOffset !== 0 && (
                <button className="btn btn-ghost" onClick={goToToday} style={{ marginBottom: '1rem', width: '100%' }}>
                    ← Back to Today
                </button>
            )}

            {/* Fallback Warning */}
            {isFallbackPlan && (
                <div className="fallback-warning">
                    ⚠️ Showing default plan (AI generation failed)
                    <button className="btn btn-secondary" onClick={regeneratePlan} style={{ marginTop: '0.5rem' }}>
                        Retry AI Generation
                    </button>
                </div>
            )}

            {/* Header */}
            <div className="page-header">
                <div className="flex justify-between items-center">
                    <h1 className="page-title">
                        {dateOffset === 0 ? 'Good morning 👋' : dateOffset > 0 ? 'Upcoming Plan 📅' : 'Past Day 📋'}
                    </h1>
                    <button className="btn btn-ghost" onClick={onOpenSettings}>⚙️</button>
                </div>
                <p className="page-subtitle">Your personalized day is ready</p>
            </div>

            {/* Today's Workout - Hero Card */}
            <Card
                title={`🏋️ ${workout.title}`}
                subtitle={`${workout.duration} minutes`}
                personalization={workout.personalization}
                hero
            >
                <div className="mt-4">
                    {exercisesToShow?.map((ex, i) => (
                        <div key={i} className="workout-step">
                            <div className="workout-step-info">
                                <div className="workout-step-name">{ex.name}</div>
                                <div className="workout-step-detail">{ex.detail}</div>
                            </div>
                            {ex.link && (
                                <a href={ex.link} target="_blank" rel="noopener noreferrer" className="link-icon" title="View guide">
                                    🔗
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* Show more/less toggle */}
                {workout.exercises?.length > 3 && (
                    <button
                        className="btn btn-ghost mt-4"
                        onClick={() => setShowAllExercises(!showAllExercises)}
                    >
                        {showAllExercises ? 'Show less ↑' : `Show all ${workout.exercises.length} exercises ↓`}
                    </button>
                )}

                {/* V3: Completion tracking */}
                {dateOffset === 0 && !workoutCompleted && (
                    <div className="workout-actions mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                markWorkoutComplete()
                                addToMealHistory(currentPlan.meals)
                                setWorkoutCompleted(true)
                            }}
                        >
                            ✓ Mark Complete
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                markWorkoutSkipped()
                                setWorkoutCompleted(true)
                            }}
                        >
                            Skip Today
                        </button>
                    </div>
                )}

                {workoutCompleted && (
                    <div className="text-success mt-4">✓ Logged for today</div>
                )}

                <button
                    className="btn btn-ghost mt-4"
                    onClick={() => onNavigate('coach')}
                >
                    Why this workout? →
                </button>
            </Card>

            {/* Today's Meals */}
            <Card title="🍽️ Today's Meals">
                <div className="meal-item">
                    <div>
                        <div className="meal-name">{meals.breakfast?.name}</div>
                        <div className="meal-desc">{meals.breakfast?.desc}</div>
                    </div>
                    <span className="text-muted">Breakfast</span>
                    {meals.breakfast?.link && (
                        <a href={meals.breakfast.link} target="_blank" rel="noopener noreferrer" className="link-icon">🔗</a>
                    )}
                </div>
                <div className="meal-item">
                    <div>
                        <div className="meal-name">{meals.lunch?.name}</div>
                        <div className="meal-desc">{meals.lunch?.desc}</div>
                    </div>
                    <span className="text-muted">Lunch</span>
                    {meals.lunch?.link && (
                        <a href={meals.lunch.link} target="_blank" rel="noopener noreferrer" className="link-icon">🔗</a>
                    )}
                </div>
                <div className="meal-item">
                    <div>
                        <div className="meal-name">{meals.dinner?.name}</div>
                        <div className="meal-desc">{meals.dinner?.desc}</div>
                    </div>
                    <span className="text-muted">Dinner</span>
                    {meals.dinner?.link && (
                        <a href={meals.dinner.link} target="_blank" rel="noopener noreferrer" className="link-icon">🔗</a>
                    )}
                </div>
                {meals.snacks && (
                    <div className="meal-item">
                        <div>
                            <div className="meal-name">{meals.snacks?.name}</div>
                            <div className="meal-desc">{meals.snacks?.desc}</div>
                        </div>
                        <span className="text-muted">Snacks</span>
                        {meals.snacks?.link && (
                            <a href={meals.snacks.link} target="_blank" rel="noopener noreferrer" className="link-icon">🔗</a>
                        )}
                    </div>
                )}
            </Card>

            {/* Recovery Preview */}
            <Card
                title="🧘 Recovery Focus"
                className="recovery-preview"
                onClick={() => onNavigate('recovery')}
            >
                <p className="text-muted">
                    {currentPlan.recovery?.suggestion || 'View your recovery suggestions'}
                </p>
                {currentPlan.recovery?.link && (
                    <a
                        href={currentPlan.recovery.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-icon"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Learn more 🔗
                    </a>
                )}
            </Card>
        </div>
    )
}

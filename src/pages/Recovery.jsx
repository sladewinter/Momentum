import { useState } from 'react'
import { useUser } from '../context/UserContext'
import Button from '../components/Button'

// Fallback suggestions when AI hasn't generated one
const RECOVERY_SUGGESTIONS = {
    morning: [
        { icon: '☀️', suggestion: 'Get 10 minutes of morning sunlight', reason: 'Helps regulate your circadian rhythm and boost morning energy' },
        { icon: '💧', suggestion: 'Drink a glass of water right now', reason: 'Rehydrate after sleep to kickstart metabolism' },
        { icon: '🧘', suggestion: '3 minutes of box breathing', reason: 'Reduces stress and activates your parasympathetic system' }
    ],
    'post-workout': [
        { icon: '🧊', suggestion: 'Apply ice to any sore muscles', reason: 'Reduces inflammation and speeds recovery' },
        { icon: '💧', suggestion: 'Drink water with electrolytes', reason: 'Replace minerals lost during sweat' },
        { icon: '🍌', suggestion: 'Have a protein-rich snack', reason: 'Supports muscle repair within 30 min of workout' }
    ],
    evening: [
        { icon: '📵', suggestion: 'No screens 1 hour before bed', reason: 'Blue light disrupts melatonin production and sleep quality' },
        { icon: '🛏️', suggestion: 'Set a consistent bedtime tonight', reason: 'Sleep consistency matters more than duration' },
        { icon: '🚿', suggestion: 'Take a warm shower', reason: 'Drop in body temperature signals sleep to your brain' }
    ]
}

export default function Recovery() {
    const { getCurrentPlan, dateOffset } = useUser()
    const [category, setCategory] = useState('morning')
    const [suggestionIndex, setSuggestionIndex] = useState(0)

    const currentPlan = getCurrentPlan()

    // Get recovery suggestion - prefer AI-generated, fallback to category-based
    const getRecoverySuggestion = () => {
        // If AI generated a recovery suggestion for today, show it first
        if (currentPlan?.recovery && suggestionIndex === 0 && category === 'morning') {
            return currentPlan.recovery
        }
        // Otherwise use category-based fallback
        const suggestions = RECOVERY_SUGGESTIONS[category] || RECOVERY_SUGGESTIONS.morning
        return suggestions[suggestionIndex % suggestions.length]
    }

    const showNext = () => {
        const suggestions = RECOVERY_SUGGESTIONS[category] || RECOVERY_SUGGESTIONS.morning
        setSuggestionIndex((prev) => (prev + 1) % suggestions.length)
    }

    const changeCategory = (cat) => {
        setCategory(cat)
        setSuggestionIndex(0)
    }

    const current = getRecoverySuggestion()

    return (
        <div className="page">
            {/* Header */}
            <div className="page-header">
                <h1 className="page-title">Recovery</h1>
                <p className="page-subtitle">Small habits, big impact</p>
            </div>

            {/* Category Selector */}
            <div className="card">
                <div className="card-title">Focus area</div>
                <div className="chip-container" style={{ marginTop: '0.75rem' }}>
                    <button
                        className={`chip ${category === 'morning' ? 'selected' : ''}`}
                        onClick={() => changeCategory('morning')}
                    >
                        ☀️ Morning
                    </button>
                    <button
                        className={`chip ${category === 'post-workout' ? 'selected' : ''}`}
                        onClick={() => changeCategory('post-workout')}
                    >
                        💪 Post-workout
                    </button>
                    <button
                        className={`chip ${category === 'evening' ? 'selected' : ''}`}
                        onClick={() => changeCategory('evening')}
                    >
                        🌙 Evening
                    </button>
                </div>
            </div>

            {/* Main Recovery Card */}
            <div className="card recovery-card">
                <div className="recovery-icon">{current.icon}</div>
                <div className="recovery-suggestion">{current.suggestion}</div>
                <div className="recovery-reason">{current.reason}</div>

                <Button variant="secondary" onClick={showNext}>
                    Show another suggestion
                </Button>
            </div>

            {/* AI-generated suggestion if available */}
            {currentPlan?.recovery && category !== 'morning' && (
                <div className="card">
                    <div className="card-title">🤖 AI Suggestion for Today</div>
                    <p className="text-muted" style={{ marginTop: '0.5rem' }}>
                        {currentPlan.recovery.icon} {currentPlan.recovery.suggestion}
                    </p>
                </div>
            )}

            {/* Why recovery matters */}
            <div className="card">
                <div className="card-title">💡 Why recovery matters</div>
                <p className="text-muted" style={{ marginTop: '0.5rem', lineHeight: 1.6 }}>
                    Recovery isn't passive—it's when your body adapts and grows stronger.
                    These micro-habits compound over time into significant health improvements.
                </p>
            </div>
        </div>
    )
}

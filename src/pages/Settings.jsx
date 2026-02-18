import { useState } from 'react'
import { useUser } from '../context/UserContext'
import Button from '../components/Button'
import Card from '../components/Card'

const WORKOUT_TYPES = [
    { id: 'gym', label: 'Gym', icon: '🏋️' },
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'running', label: 'Running', icon: '🏃' },
    { id: 'yoga', label: 'Yoga', icon: '🧘' },
    { id: 'calisthenics', label: 'Calisthenics', icon: '🤸' },
    { id: 'mixed', label: 'Mixed', icon: '🔄' }
]

export default function Settings({ onClose }) {
    const { userData, updateUser, resetPreferences, deleteAccount, logout, clearCoachHistory } = useUser()

    const [goal, setGoal] = useState(userData.goal || '')
    const [workoutType, setWorkoutType] = useState(userData.workoutType)
    const [duration, setDuration] = useState(userData.duration || 30)
    const [constraints, setConstraints] = useState(
        // Handle both string (new) and array (legacy) formats
        Array.isArray(userData.constraints)
            ? userData.constraints.join(', ')
            : userData.constraints || ''
    )
    const [showConfirmReset, setShowConfirmReset] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    const handleSave = () => {
        updateUser({
            goal: goal.trim(),
            workoutType,
            duration,
            constraints: constraints.trim(),
            experience: constraints.toLowerCase().includes('beginner') ? 'beginner' : 'intermediate',
            // Clear everything when preferences change
            plans: {},
            workoutHistory: [],
            mealHistory: [],
            adjustmentHistory: [],
            coachHistory: []
        })
        onClose()
    }

    const handleReset = () => {
        resetPreferences()
        onClose()
    }

    const handleDelete = () => {
        deleteAccount()
    }

    return (
        <div className="page settings-page">
            <div className="page-header">
                <div className="flex justify-between items-center">
                    <h1 className="page-title">Settings</h1>
                    <button className="btn btn-ghost" onClick={onClose}>✕</button>
                </div>
                <p className="page-subtitle">Manage your preferences</p>
            </div>

            {/* User Info */}
            <Card title={`👤 ${userData.name || 'User'}`}>
                <p className="text-muted">Logged in as @{userData.name}</p>
                <Button variant="secondary" onClick={logout} style={{ marginTop: '1rem' }}>
                    Sign Out
                </Button>
            </Card>

            {/* Goal - Freeform text */}
            <Card title="🎯 Goal">
                <textarea
                    className="text-input"
                    placeholder="Describe your health goal..."
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    rows={3}
                />
            </Card>

            {/* Workout Type - Still tiles */}
            <Card title="🏋️ Workout Style">
                <div className="chip-container">
                    {WORKOUT_TYPES.map(w => (
                        <button
                            key={w.id}
                            className={`chip ${workoutType === w.id ? 'selected' : ''}`}
                            onClick={() => setWorkoutType(w.id)}
                        >
                            {w.icon} {w.label}
                        </button>
                    ))}
                </div>
            </Card>

            {/* Duration */}
            <Card title="⏱️ Time Available">
                <div className="slider-container">
                    <div className="slider-label">
                        <span>Duration</span>
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
            </Card>

            {/* Constraints - Freeform text */}
            <Card title="⚠️ Limitations">
                <textarea
                    className="text-input"
                    placeholder="Any injuries, restrictions, or preferences..."
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    rows={3}
                />
            </Card>

            {/* Save Button */}
            <Button variant="primary" fullWidth onClick={handleSave}>
                Save Changes
            </Button>

            {/* Danger Zone */}
            <Card title="🚨 Danger Zone" className="mt-4">
                <div className="flex flex-col gap-3">
                    <Button variant="secondary" onClick={clearCoachHistory}>
                        Clear Chat History
                    </Button>

                    {!showConfirmReset ? (
                        <Button variant="secondary" onClick={() => setShowConfirmReset(true)}>
                            Reset Preferences
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="primary" onClick={handleReset}>
                                Confirm Reset
                            </Button>
                            <Button variant="secondary" onClick={() => setShowConfirmReset(false)}>
                                Cancel
                            </Button>
                        </div>
                    )}

                    {!showConfirmDelete ? (
                        <Button variant="secondary" onClick={() => setShowConfirmDelete(true)} style={{ color: 'var(--color-error)' }}>
                            Delete Account
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="primary" onClick={handleDelete} style={{ background: 'var(--color-error)' }}>
                                Confirm Delete
                            </Button>
                            <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}

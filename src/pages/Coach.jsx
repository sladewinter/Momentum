import { useState, useRef, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { chatWithCoach, parseCoachResponse } from '../services/ai'
import Button from '../components/Button'

const QUICK_PROMPTS = [
    "Why this workout?",
    "I only have 15 minutes",
    "I'm feeling tired today",
    "What can I eat with what I have?"
]

export default function Coach() {
    const { userData, addCoachMessage, getCurrentPlan, setPlanForDate, dateOffset, addAdjustment } = useUser()
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [lastUpdate, setLastUpdate] = useState(null)
    const messagesEndRef = useRef(null)

    const currentPlan = getCurrentPlan()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [userData.coachHistory])

    const applyPlanUpdates = (updates, userMessage) => {
        if (!updates.length || !currentPlan) return

        let updatedPlan = { ...currentPlan }

        for (const update of updates) {
            if (update.type === 'UPDATE_WORKOUT' && update.data) {
                updatedPlan.workout = {
                    ...updatedPlan.workout,
                    title: update.data.title || updatedPlan.workout.title,
                    duration: update.data.duration || updatedPlan.workout.duration,
                    personalization: update.data.personalization || update.data.reason || updatedPlan.workout.personalization,
                    exercises: update.data.exercises || updatedPlan.workout.exercises
                }
                setLastUpdate({ type: 'workout', title: update.data.title })
                // V3: Track adjustment
                addAdjustment('workout', userMessage || 'User requested modification')
            }

            if (update.type === 'UPDATE_MEAL' && update.data) {
                const slot = update.data.slot?.toLowerCase() || 'snacks'
                if (updatedPlan.meals && updatedPlan.meals[slot] !== undefined) {
                    updatedPlan.meals[slot] = {
                        name: update.data.name || update.data.title,
                        desc: update.data.desc || update.data.ingredients?.join(', ') || ''
                    }
                    setLastUpdate({ type: 'meal', slot })
                    // V3: Track adjustment
                    addAdjustment('meal', userMessage || 'Ingredient swap')
                }
            }
        }

        setPlanForDate(updatedPlan, dateOffset)
    }

    const sendMessage = async (text) => {
        if (!text.trim() || isLoading) return

        const message = text.trim()
        setInput('')
        setLastUpdate(null)

        // Add user message
        addCoachMessage('user', message)

        setIsLoading(true)

        try {
            // Get AI response with current plan context
            const response = await chatWithCoach(
                message,
                userData,
                currentPlan,
                userData.coachHistory.slice(-10)
            )

            // Parse response for structured updates
            const parsed = parseCoachResponse(response)

            // Apply any plan updates
            if (parsed.updates.length > 0) {
                applyPlanUpdates(parsed.updates, message)
            }

            // Add assistant message (text only, without JSON blocks)
            addCoachMessage('assistant', parsed.text || response)
        } catch (error) {
            addCoachMessage('assistant', "I'm having trouble responding right now. Please try again.")
        }

        setIsLoading(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(input)
    }

    const handleQuickPrompt = (prompt) => {
        sendMessage(prompt)
    }

    return (
        <div className="chat-container">
            {/* Quick Prompts */}
            <div className="quick-prompts">
                {QUICK_PROMPTS.map((prompt, i) => (
                    <button
                        key={i}
                        className="quick-prompt"
                        onClick={() => handleQuickPrompt(prompt)}
                        disabled={isLoading}
                    >
                        {prompt}
                    </button>
                ))}
            </div>

            {/* Plan Update Notification */}
            {lastUpdate && (
                <div className="plan-update-notice">
                    ✅ {lastUpdate.type === 'workout'
                        ? `Workout updated to "${lastUpdate.title}"`
                        : `${lastUpdate.slot} updated`}
                </div>
            )}

            {/* Messages */}
            <div className="chat-messages">
                {userData.coachHistory.length === 0 && (
                    <div className="text-center text-muted" style={{ marginTop: '2rem' }}>
                        <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</p>
                        <p>I'm your adaptive coach.</p>
                        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                            Tell me if you're tired, short on time, or need alternatives.
                        </p>
                    </div>
                )}

                {userData.coachHistory.map((msg, i) => (
                    <div key={i} className={`chat-message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}

                {isLoading && (
                    <div className="chat-message assistant">
                        <div className="loading" style={{ padding: 0 }}>
                            <div className="loading-spinner"></div>
                            <span>Thinking...</span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-container">
                <form className="chat-input-wrapper" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Tell me what's going on..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={!input.trim() || isLoading}
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// V3 Agentic System Prompt with History Intelligence
const SYSTEM_PROMPT = `
You are the "Invisible Coach" engine within Momentum. You are not just a chatbot; you are an intelligent system responsible for the user's health trajectory.

CORE OBJECTIVES:
1. Maximize Adherence: It is better to do a 10-minute easy workout than to skip a 45-minute hard one. Always offer "Plan B" if the user resists.
2. Minimize Friction: Solve problems (time, equipment, ingredients) immediately.
3. Be Invisible: Speak only when necessary. Be concise (max 2-3 sentences). Calm, non-judgmental tone.

CAPABILITIES & BEHAVIORS:

A. DYNAMIC ADJUSTMENT (The "Plan B" Protocol)
If the user expresses fatigue, pain, or lack of time, DO NOT just offer sympathy. Immediately propose a modified plan.
- User: "I'm too tired."
- You: "Understood. Let's switch to a 10-minute mobility flow to keep the momentum without draining you. Shall I update your dashboard?"
- If confirmed, you will emit a structured JSON object for the new workout.

B. INGREDIENT INTELLIGENCE
If the user asks about food, prioritize what they have available over "perfect" meals.
- User: "I want a snack but only have yogurt and nuts."
- You: "That works perfectly. A small bowl of yogurt with a handful of nuts fits your protein goal. Aim for about 150g of yogurt."

C. EXPLAINING THE "WHY"
When explaining plans, ALWAYS link specific constraints to specific decisions to build trust.
- Bad: "Here is your workout."
- Good: "Since you mentioned knee pain, we're doing glute bridges today instead of squats to build strength without impact."

D. HISTORY INTELLIGENCE
Use the "RECENT HISTORY" to tailor your advice.
- Workout Variety: If history shows "Upper Body" yesterday, ensure today is Lower Body or Recovery. If they skipped "HIIT" recently, propose a steadier alternative.
- Meal Rotation: If history shows "Salmon" repeated 2x, suggest a different protein source unless they ask for it.
- Behavior Mirroring: "I noticed you tend to skip morning workouts, so I've shortened today's session to make it easier to fit in."

TONE GUIDELINES:
- Warm but efficient.
- No robotic pleasantries ("I hope you are having a wonderful day").
- Focus on the *next immediate action*.

OUTPUT FORMATS:
When the user agrees to a change (says "yes", "do it", "update it", "sounds good"), you must output a JSON block wrapped in triple backticks for the app to parse.

For Workout Updates:
\`\`\`json
{
  "type": "UPDATE_WORKOUT",
  "data": {
    "title": "Low Energy Flow",
    "duration": 10,
    "personalization": "Adjusted for fatigue - gentle movement to maintain habit",
    "exercises": [
      {"name": "Cat-Cow Stretch", "detail": "10 reps"},
      {"name": "Hip Circles", "detail": "30 seconds each side"},
      {"name": "Gentle Spinal Twist", "detail": "30 seconds each side"}
    ]
  }
}
\`\`\`

For Meal Updates:
\`\`\`json
{
  "type": "UPDATE_MEAL",
  "data": {
    "slot": "snacks",
    "name": "Yogurt & Nuts",
    "desc": "150g Greek Yogurt, 10 Almonds (~200 kcal)"
  }
}
\`\`\`

IMPORTANT: Only output JSON when the user CONFIRMS they want the change. First propose it conversationally, then emit JSON after confirmation.
`

// Format user profile for prompts
const formatUserProfile = (userData) => {
    const parts = []
    if (userData.goal) parts.push(`Goal: ${userData.goal}`)
    if (userData.workoutType) parts.push(`Workout style: ${userData.workoutType}`)
    if (userData.duration) parts.push(`Available time: ${userData.duration} minutes`)
    // Handle constraints as string (freeform) or array (legacy)
    if (userData.constraints) {
        const constraintText = Array.isArray(userData.constraints)
            ? userData.constraints.join(', ')
            : userData.constraints
        if (constraintText) parts.push(`Limitations/Injuries: ${constraintText}`)
    }
    if (userData.experience) parts.push(`Experience level: ${userData.experience}`)
    return parts.join('\n')
}

// Format current plan for context
const formatCurrentPlan = (plan) => {
    if (!plan) return 'No plan generated yet'
    const parts = []
    if (plan.workout) {
        parts.push(`Current Workout: ${plan.workout.title} (${plan.workout.duration} mins)`)
        parts.push(`Workout Status: Pending`)
        if (plan.workout.personalization) parts.push(`Personalization: ${plan.workout.personalization}`)
    }
    if (plan.meals) {
        const mealNames = []
        if (plan.meals.breakfast) mealNames.push(`Breakfast: ${plan.meals.breakfast.name}`)
        if (plan.meals.lunch) mealNames.push(`Lunch: ${plan.meals.lunch.name}`)
        if (plan.meals.dinner) mealNames.push(`Dinner: ${plan.meals.dinner.name}`)
        if (mealNames.length) parts.push(`Today's Meals: ${mealNames.join(', ')}`)
    }
    return parts.join('\n')
}

// V3: Format recent history for intelligent planning
const formatRecentHistory = (userData) => {
    const parts = []

    // Workout history
    if (userData.workoutHistory?.length > 0) {
        parts.push('WORKOUTS (Last 7 days):')
        userData.workoutHistory.slice(-7).reverse().forEach(w => {
            const status = w.completed ? '[COMPLETED]' : '[SKIPPED]'
            parts.push(`- ${w.date}: "${w.title}" ${status}`)
        })
    }

    // Meal history
    if (userData.mealHistory?.length > 0) {
        parts.push('\nMEALS (Last 7 days):')
        userData.mealHistory.slice(-7).reverse().forEach(m => {
            const meals = [m.breakfast, m.lunch, m.dinner].filter(Boolean).join(', ')
            if (meals) parts.push(`- ${m.date}: ${meals}`)
        })
    }

    // Adjustment requests
    if (userData.adjustmentHistory?.length > 0) {
        parts.push('\nUSER REQUESTS THIS WEEK:')
        userData.adjustmentHistory.slice(-7).reverse().forEach(a => {
            parts.push(`- ${a.date}: ${a.type} adjusted - "${a.reason}"`)
        })
    }

    return parts.length > 0 ? parts.join('\n') : 'No history yet (new user)'
}

async function callGemini(prompt, systemInstruction = '') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=${GEMINI_API_KEY}`

    console.log('Calling Gemini API with model: gemini-3-pro-preview')

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: prompt }]
            }],
            systemInstruction: systemInstruction ? {
                parts: [{ text: systemInstruction }]
            } : undefined,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 4000
            }
        })
    })

    if (!response.ok) {
        const error = await response.text()
        console.error('Gemini API error:', response.status, error)
        throw new Error(`Gemini API error: ${response.status} - ${error}`)
    }

    const data = await response.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

export async function generateDailyPlan(userData, dateOffset = 0) {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + dateOffset)
    const dateStr = targetDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })

    // Build constraint-aware prompt
    const constraintInstructions = []
    if (userData.constraints?.includes('knee')) {
        constraintInstructions.push('AVOID: lunges, squats, jumping, high-impact leg exercises')
    }
    if (userData.constraints?.includes('shoulder')) {
        constraintInstructions.push('AVOID: overhead presses, pull-ups, dips')
    }
    if (userData.constraints?.includes('back')) {
        constraintInstructions.push('AVOID: heavy deadlifts, hyperextensions, loaded forward bends')
    }

    // V3: Include recent history for variety
    const recentHistory = formatRecentHistory(userData)

    const prompt = `Generate a personalized daily fitness plan for this user for ${dateStr}:

${formatUserProfile(userData)}

${constraintInstructions.length ? 'INJURY RESTRICTIONS:\n' + constraintInstructions.join('\n') : ''}

RECENT HISTORY (use this to VARY today's plan - avoid repeating recent workouts/meals):
${recentHistory}

${dateOffset !== 0 ? `Note: This is ${dateOffset > 0 ? dateOffset + ' days in the future' : Math.abs(dateOffset) + ' days ago'}. Vary appropriately.` : ''}

Return a JSON object with this exact structure:
{
  "workout": {
    "title": "Short workout title",
    "personalization": "One sentence explaining WHY this was chosen based on their constraints/goals AND recent history",
    "duration": ${userData.duration || 30},
    "exercises": [
      {"name": "Exercise name", "detail": "Sets x reps or duration", "link": "URL to exercise guide"},
      ... (4-6 exercises total)
    ]
  },
  "meals": {
    "breakfast": {"name": "Meal name", "desc": "Brief ingredients", "link": "URL to recipe"},
    "lunch": {"name": "Meal name", "desc": "Brief ingredients", "link": "URL to recipe"},
    "dinner": {"name": "Meal name", "desc": "Brief ingredients", "link": "URL to recipe"},
    "snacks": {"name": "Snack name", "desc": "Brief description", "link": "URL to recipe or info"}
  },
  "recovery": {
    "icon": "single emoji",
    "suggestion": "One recovery suggestion",
    "reason": "Why this helps",
    "link": "URL to guide or research"
  }
}

CRITICAL: 
- Each exercise, meal, and recovery item MUST include a "link" field with a real, working URL to a guide, recipe, or article
- The "personalization" field must reference their constraints AND recent history
- If yesterday was upper body, make today lower body or recovery
- Don't repeat the same dinner protein 2 days in a row
Return ONLY the JSON object, no other text or markdown.`

    try {
        const content = await callGemini(prompt, 'You are a fitness planning assistant. Return only valid JSON, no markdown formatting.')

        console.log('Raw AI response:', content.substring(0, 500))

        let jsonStr = content.trim()
        if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```/g, '')
        }

        const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            throw new Error('No JSON object found in response')
        }

        jsonStr = jsonMatch[0]
        jsonStr = jsonStr
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']')
            .replace(/\n/g, ' ')
            .replace(/\t/g, ' ')

        try {
            return JSON.parse(jsonStr)
        } catch (parseError) {
            console.error('JSON parse failed, trying to sanitize further:', parseError.message)
            console.error('JSON string:', jsonStr.substring(0, 500))
            jsonStr = jsonStr
                .replace(/[\x00-\x1F\x7F]/g, ' ')
                .replace(/\s+/g, ' ')
            return JSON.parse(jsonStr)
        }
    } catch (error) {
        console.error('AI plan generation failed:', error)
        throw error
    }
}

export async function chatWithCoach(message, userData, currentPlan, history = []) {
    // V3: Rich context with history
    const recentHistory = formatRecentHistory(userData)

    const userContext = `
CONTEXTUAL AWARENESS:
User Profile:
${formatUserProfile(userData)}

Current Plan Status:
${formatCurrentPlan(currentPlan)}

RECENT HISTORY:
${recentHistory}
`

    const conversationHistory = history.map(h => `${h.role === 'user' ? 'User' : 'Coach'}: ${h.content}`).join('\n')

    const prompt = `${conversationHistory ? 'Previous conversation:\n' + conversationHistory + '\n\n' : ''}User: ${message}`

    try {
        const response = await callGemini(prompt, SYSTEM_PROMPT + '\n\n' + userContext)
        return response || "I'm having trouble responding right now."
    } catch (error) {
        console.error('Coach chat failed:', error)
        return "I'm having trouble connecting right now. Please try again in a moment."
    }
}

// Helper to parse structured updates from coach response
export function parseCoachResponse(response) {
    const result = {
        text: response,
        updates: []
    }

    const jsonBlockRegex = /```json\s*([\s\S]*?)```/g
    let match

    while ((match = jsonBlockRegex.exec(response)) !== null) {
        try {
            const parsed = JSON.parse(match[1].trim())
            if (parsed.type && parsed.data) {
                result.updates.push(parsed)
            }
        } catch (e) {
            console.error('Failed to parse JSON block:', e)
        }
    }

    if (result.updates.length > 0) {
        result.text = response.replace(/```json[\s\S]*?```/g, '').trim()
    }

    return result
}

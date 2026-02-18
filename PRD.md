# Momentum - Product Requirements Document

**Version:** 2.0 COMPLETE  
**Last Updated:** December 15, 2024

---

## Product Overview

Momentum is a personal health OS with an "Invisible Coach" — an AI-powered app that provides personalized workout, nutrition, and recovery guidance while maintaining a calm, non-overwhelming interface.

**Philosophy:** "The plan adapts to the user; the user shouldn't force themselves to fit the plan."

---

## Stage 1 Features ✅

### 1. User Authentication
| Feature | Status |
|---------|--------|
| Register (username, password, name) | ✅ |
| Login | ✅ |
| Logout | ✅ |
| Multi-user (localStorage) | ✅ |

### 2. Onboarding Flow
| Step | Data Collected |
|------|---------------|
| Goal | Fat Loss, Muscle Gain, Fitness, Recovery |
| Workout Type | Gym, Home, Running, Yoga, Calisthenics |
| Duration | 10–60 minutes |
| Constraints | Knee, Shoulder, Back pain, Low stamina, Limited equipment, Beginner |

### 3. AI-Generated Daily Plans
- Workout with constraint-aware exercises
- Meal plan (Breakfast, Lunch, Dinner, Snacks)
- Recovery suggestion with reasoning
- Personalization tags explaining "why"

### 4. Date Navigation
- Past/future day navigation with ← →
- Each day generates unique AI plan
- "Back to Today" quick action

### 5. Settings & Account
- Edit all preferences
- Reset preferences (restart onboarding)
- Clear chat history
- Delete account

---

## Stage 2 Features ✅ (Agentic Coach)

### 2.1 "Plan B" Protocol
**Trigger:** User says "I'm tired" / "I only have 15 minutes" / "My knee hurts"
**Action:** Coach proposes modified workout immediately
**Confirmation:** User says "yes" → workout updates on dashboard

### 2.2 "Fridge-First" Nutrition
**Trigger:** "I only have eggs and bread"
**Action:** Coach generates meal using available ingredients
**Confirmation:** User confirms → meal slot updates

### 2.3 Structured JSON Updates
Coach outputs parseable JSON blocks:
```json
{"type": "UPDATE_WORKOUT", "data": {...}}
{"type": "UPDATE_MEAL", "data": {...}}
```
Frontend automatically applies changes to plan state.

### 2.4 Context-Aware Responses
- Coach knows current plan status
- References user constraints in explanations
- Explains "why" for every recommendation

### 2.5 Quick Prompts
- "Why this workout?"
- "I only have 15 minutes"
- "I'm feeling tired today"
- "What can I eat with what I have?"

---

## Technical Implementation ✅

### AI Integration
| Function | Purpose |
|----------|---------|
| `generateDailyPlan(userData, dateOffset)` | Creates workout + meals + recovery |
| `chatWithCoach(message, userData, currentPlan, history)` | Conversational + agentic responses |
| `parseCoachResponse(response)` | Extracts JSON updates from chat |

### Data Model
```javascript
User {
  // Auth
  password, name, createdAt
  
  // Profile
  goal, workoutType, duration, constraints, experience
  
  // Plans (keyed by date offset)
  plans: { 0: {...}, 1: {...}, -1: {...} }
  
  // Coach
  coachHistory: [{ role, content, timestamp }]
}
```

### AI Model
- **Model:** `gemini-3-pro-preview`
- **Max Tokens:** 4000
- **Temperature:** 0.7

---

## Stage 3 Opportunities

> *Ready for brainstorming*

Potential next features:
- [ ] Workout completion tracking
- [ ] Progress visualization / streaks
- [ ] Multi-week program generation
- [ ] Voice input for hands-free interaction
- [ ] Photo-based food logging
- [ ] Wearable integration (Apple Health, Fitbit)
- [ ] Push notification reminders
- [ ] Social / accountability features

---

## Success Metrics

| Metric | Definition |
|--------|------------|
| Plan B Adoption | % of users who accept modified plans |
| Coach Engagement | Messages per session |
| Retention | Users returning after 7 days |
| Plan Completion | % of workouts marked complete |

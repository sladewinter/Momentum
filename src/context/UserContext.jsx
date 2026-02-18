import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext(null)

const USERS_KEY = 'momentum_users'
const CURRENT_USER_KEY = 'momentum_current_user'

const defaultUserData = {
    // Onboarding data
    isOnboarded: false,
    goal: null,
    workoutType: null,
    duration: 30,
    constraints: [],
    experience: 'beginner',

    // Generated plans by date offset
    plans: {},

    // V3: Rolling history (last 7 days)
    workoutHistory: [],  // [{ date, title, exercises, completed }]
    mealHistory: [],     // [{ date, breakfast, lunch, dinner, snacks }]
    adjustmentHistory: [], // [{ date, type, reason }]

    // Coach conversation
    coachHistory: []
}

// Get all users from localStorage
const getAllUsers = () => {
    try {
        const stored = localStorage.getItem(USERS_KEY)
        return stored ? JSON.parse(stored) : {}
    } catch (e) {
        return {}
    }
}

// Save all users to localStorage
const saveAllUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Helper to get date string
const getDateKey = (offset = 0) => {
    const date = new Date()
    date.setDate(date.getDate() + offset)
    return date.toISOString().split('T')[0] // YYYY-MM-DD
}

// Prune history to last 7 entries
const pruneHistory = (history, maxDays = 7) => {
    return history.slice(-maxDays)
}

export function UserProvider({ children }) {
    // Auth state
    const [currentUsername, setCurrentUsername] = useState(() => {
        return localStorage.getItem(CURRENT_USER_KEY) || null
    })
    const [isLoggedIn, setIsLoggedIn] = useState(!!currentUsername)

    // User data state
    const [userData, setUserData] = useState(() => {
        if (currentUsername) {
            const users = getAllUsers()
            return { ...defaultUserData, ...users[currentUsername] }
        }
        return defaultUserData
    })

    // Date navigation
    const [dateOffset, setDateOffset] = useState(0)

    // Persist current user's data when it changes
    useEffect(() => {
        if (currentUsername && isLoggedIn) {
            const users = getAllUsers()
            users[currentUsername] = userData
            saveAllUsers(users)
        }
    }, [userData, currentUsername, isLoggedIn])

    // Auth functions
    const login = (username, password) => {
        const users = getAllUsers()
        if (users[username]) {
            if (users[username].password === password) {
                setCurrentUsername(username)
                setIsLoggedIn(true)
                localStorage.setItem(CURRENT_USER_KEY, username)
                setUserData({ ...defaultUserData, ...users[username] })
                return { success: true }
            }
            return { success: false, error: 'Incorrect password' }
        }
        return { success: false, error: 'User not found' }
    }

    const register = (username, password, name) => {
        if (!username || !password) {
            return { success: false, error: 'Username and password required' }
        }

        const users = getAllUsers()
        if (users[username]) {
            return { success: false, error: 'Username already exists' }
        }

        const newUser = {
            ...defaultUserData,
            password,
            name: name || username,
            createdAt: Date.now()
        }

        users[username] = newUser
        saveAllUsers(users)

        setCurrentUsername(username)
        setIsLoggedIn(true)
        localStorage.setItem(CURRENT_USER_KEY, username)
        setUserData(newUser)

        return { success: true }
    }

    const logout = () => {
        setCurrentUsername(null)
        setIsLoggedIn(false)
        localStorage.removeItem(CURRENT_USER_KEY)
        setUserData(defaultUserData)
        setDateOffset(0)
    }

    const updateUser = (updates) => {
        setUserData(prev => ({ ...prev, ...updates }))
    }

    const completeOnboarding = (data) => {
        updateUser({
            ...data,
            isOnboarded: true
        })
    }

    // Reset user preferences
    const resetPreferences = () => {
        setUserData(prev => ({
            ...defaultUserData,
            password: prev.password,
            name: prev.name,
            createdAt: prev.createdAt
        }))
        setDateOffset(0)
    }

    // Delete account
    const deleteAccount = () => {
        if (currentUsername) {
            const users = getAllUsers()
            delete users[currentUsername]
            saveAllUsers(users)
        }
        logout()
    }

    // Plan management
    const setPlanForDate = (plan, offset = 0) => {
        setUserData(prev => ({
            ...prev,
            plans: { ...prev.plans, [offset]: plan }
        }))
    }

    const getCurrentPlan = () => {
        return userData.plans[dateOffset] || null
    }

    const setTodayPlan = (plan) => {
        setPlanForDate(plan, 0)
    }

    // V3: History management
    const addToWorkoutHistory = (workout, completed = false) => {
        const entry = {
            date: getDateKey(dateOffset),
            title: workout.title,
            exercises: workout.exercises?.map(e => e.name) || [],
            completed
        }
        setUserData(prev => ({
            ...prev,
            workoutHistory: pruneHistory([...prev.workoutHistory, entry])
        }))
    }

    const addToMealHistory = (meals) => {
        const entry = {
            date: getDateKey(dateOffset),
            breakfast: meals.breakfast?.name || '',
            lunch: meals.lunch?.name || '',
            dinner: meals.dinner?.name || '',
            snacks: meals.snacks?.name || ''
        }
        setUserData(prev => ({
            ...prev,
            mealHistory: pruneHistory([...prev.mealHistory, entry])
        }))
    }

    const addAdjustment = (type, reason) => {
        const entry = {
            date: getDateKey(dateOffset),
            type, // 'workout' or 'meal'
            reason
        }
        setUserData(prev => ({
            ...prev,
            adjustmentHistory: pruneHistory([...prev.adjustmentHistory, entry])
        }))
    }

    const markWorkoutComplete = () => {
        const currentPlan = getCurrentPlan()
        if (currentPlan?.workout) {
            addToWorkoutHistory(currentPlan.workout, true)
        }
    }

    const markWorkoutSkipped = () => {
        const currentPlan = getCurrentPlan()
        if (currentPlan?.workout) {
            addToWorkoutHistory(currentPlan.workout, false)
        }
    }

    // Coach messages
    const addCoachMessage = (role, content) => {
        setUserData(prev => ({
            ...prev,
            coachHistory: [...prev.coachHistory, { role, content, timestamp: Date.now() }]
        }))
    }

    const clearCoachHistory = () => {
        updateUser({ coachHistory: [] })
    }

    // Date navigation
    const goToNextDay = () => setDateOffset(prev => prev + 1)
    const goToPrevDay = () => setDateOffset(prev => prev - 1)
    const goToToday = () => setDateOffset(0)

    const getDateString = () => {
        const date = new Date()
        date.setDate(date.getDate() + dateOffset)
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    }

    const value = {
        // Auth
        isLoggedIn,
        currentUsername,
        login,
        register,
        logout,

        // User data
        userData,
        updateUser,
        completeOnboarding,
        resetPreferences,
        deleteAccount,

        // Plans
        setTodayPlan,
        setPlanForDate,
        getCurrentPlan,

        // V3: History
        addToWorkoutHistory,
        addToMealHistory,
        addAdjustment,
        markWorkoutComplete,
        markWorkoutSkipped,

        // Coach
        addCoachMessage,
        clearCoachHistory,

        // Date navigation
        dateOffset,
        setDateOffset,
        goToNextDay,
        goToPrevDay,
        goToToday,
        getDateString
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}

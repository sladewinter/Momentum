import { useState } from 'react'
import { useUser } from './context/UserContext'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Recovery from './pages/Recovery'
import Coach from './pages/Coach'
import Settings from './pages/Settings'
import TestUI from './pages/TestUI'
import NavBar from './components/NavBar'

function App() {
    const { isLoggedIn, userData } = useUser()
    const [currentPage, setCurrentPage] = useState('home')
    const [showSettings, setShowSettings] = useState(false)

    // Show login if not logged in
    if (!isLoggedIn) {
        return (
            <div className="app-container">
                <Login />
            </div>
        )
    }

    // Show onboarding if not completed
    if (!userData.isOnboarded) {
        return (
            <div className="app-container">
                <Onboarding />
            </div>
        )
    }

    // Show settings overlay
    if (showSettings) {
        return (
            <div className="app-container">
                <Settings onClose={() => setShowSettings(false)} />
            </div>
        )
    }

    // Main app with navigation
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home onNavigate={setCurrentPage} onOpenSettings={() => setShowSettings(true)} />
            case 'recovery':
                return <Recovery />
            case 'coach':
                return <Coach />
            case 'test':
                return <TestUI />
            default:
                return <Home onNavigate={setCurrentPage} onOpenSettings={() => setShowSettings(true)} />
        }
    }

    return (
        <div className="app-container">
            {renderPage()}
            <NavBar currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>
    )
}

export default App

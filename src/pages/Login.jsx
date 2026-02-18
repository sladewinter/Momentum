import { useState } from 'react'
import { useUser } from '../context/UserContext'
import Button from '../components/Button'

export default function Login() {
    const { login, register } = useUser()
    const [mode, setMode] = useState('login') // 'login' or 'register'
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (mode === 'login') {
            const result = login(username, password)
            if (!result.success) {
                setError(result.error)
            }
        } else {
            const result = register(username, password, name)
            if (!result.success) {
                setError(result.error)
            }
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1 className="login-title">Momentum</h1>
                    <p className="login-subtitle">Your Personal Health OS</p>
                </div>

                <div className="login-tabs">
                    <button
                        className={`login-tab ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => { setMode('login'); setError(''); }}
                    >
                        Sign In
                    </button>
                    <button
                        className={`login-tab ${mode === 'register' ? 'active' : ''}`}
                        onClick={() => { setMode('register'); setError(''); }}
                    >
                        Create Account
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {mode === 'register' && (
                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="form-input"
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="johndoe"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="form-input"
                            required
                        />
                    </div>

                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        fullWidth
                    >
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </Button>
                </form>

                <p className="login-footer">
                    {mode === 'login'
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    <button
                        className="link-btn"
                        onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                    >
                        {mode === 'login' ? 'Create one' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    )
}

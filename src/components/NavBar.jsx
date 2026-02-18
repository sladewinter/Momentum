export default function NavBar({ currentPage, onNavigate }) {
    const navItems = [
        { id: 'home', label: 'Home', icon: '🏠' },
        { id: 'recovery', label: 'Recovery', icon: '🧘' },
        { id: 'coach', label: 'Coach', icon: '💬' },
        { id: 'test', label: 'Test', icon: '🧪' }
    ]

    return (
        <nav className="nav-bar">
            {navItems.map(item => (
                <button
                    key={item.id}
                    className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                </button>
            ))}
        </nav>
    )
}

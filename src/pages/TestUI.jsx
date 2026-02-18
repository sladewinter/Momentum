import { useState } from 'react'

function TestUI() {
    const [inputValue, setInputValue] = useState('')
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])
    const [isToggled, setIsToggled] = useState(false)

    const handleAddItem = () => {
        if (inputValue.trim()) {
            setItems([...items, inputValue.trim()])
            setInputValue('')
        }
    }

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index))
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>🧪 Test UI</h1>

            {/* Input Section */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Input Test</h2>
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type something..."
                        style={styles.input}
                    />
                    <button onClick={handleAddItem} style={styles.button}>
                        Add Item
                    </button>
                </div>
            </div>

            {/* Toggle Section */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Toggle Test</h2>
                <button
                    onClick={() => setIsToggled(!isToggled)}
                    style={{
                        ...styles.toggleButton,
                        backgroundColor: isToggled ? '#10b981' : '#6b7280'
                    }}
                >
                    {isToggled ? '✓ ON' : '✗ OFF'}
                </button>
            </div>

            {/* List Section */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>List Test ({items.length} items)</h2>
                <ul style={styles.list}>
                    {items.map((item, index) => (
                        <li key={index} style={styles.listItem}>
                            <span>{item}</span>
                            <button
                                onClick={() => handleRemoveItem(index)}
                                style={styles.removeButton}
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Status Section */}
            <div style={styles.statusBar}>
                <span>Input: "{inputValue || '(empty)'}"</span>
                <span>Toggle: {isToggled ? 'ON' : 'OFF'}</span>
                <span>Items: {items.length}</span>
            </div>
        </div>
    )
}

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        color: '#1f2937',
    },
    section: {
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
    },
    sectionTitle: {
        fontSize: '1rem',
        marginBottom: '1rem',
        color: '#4b5563',
        fontWeight: '600',
    },
    inputGroup: {
        display: 'flex',
        gap: '0.5rem',
    },
    input: {
        flex: 1,
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        fontSize: '1rem',
        outline: 'none',
    },
    button: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
    },
    toggleButton: {
        padding: '1rem 2rem',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'background-color 0.2s',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 1rem',
        backgroundColor: 'white',
        marginBottom: '0.5rem',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
    },
    removeButton: {
        width: '28px',
        height: '28px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '1.2rem',
        lineHeight: '1',
    },
    statusBar: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '1rem',
        backgroundColor: '#1f2937',
        color: '#9ca3af',
        borderRadius: '8px',
        fontSize: '0.875rem',
    },
}

export default TestUI

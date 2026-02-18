export default function Card({
    title,
    subtitle,
    personalization,
    hero = false,
    children,
    className = '',
    onClick
}) {
    return (
        <div
            className={`card ${hero ? 'card-hero' : ''} ${className}`}
            onClick={onClick}
            style={onClick ? { cursor: 'pointer' } : {}}
        >
            {title && (
                <div className="card-title">
                    {title}
                </div>
            )}
            {subtitle && (
                <div className="card-subtitle">
                    {subtitle}
                </div>
            )}
            {children}
            {personalization && (
                <div className="card-personalization">
                    ✨ {personalization}
                </div>
            )}
        </div>
    )
}

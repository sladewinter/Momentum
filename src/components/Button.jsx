export default function Button({
    children,
    variant = 'primary',
    size = 'default',
    fullWidth = false,
    onClick,
    disabled = false,
    type = 'button'
}) {
    const classes = [
        'btn',
        `btn-${variant}`,
        size === 'large' && 'btn-lg',
        fullWidth && 'btn-full'
    ].filter(Boolean).join(' ')

    return (
        <button
            className={classes}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    )
}

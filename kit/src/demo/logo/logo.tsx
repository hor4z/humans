const flower = 'M36.51 17.44A13.5 13.5 0 0 1 63.49 17.44A13.5 13.5 0 0 1 82.56 36.51A13.5 13.5 0 0 1 82.56 63.49A13.5 13.5 0 0 1 63.49 82.56A13.5 13.5 0 0 1 36.51 82.56A13.5 13.5 0 0 1 17.44 63.49A13.5 13.5 0 0 1 17.44 36.51A13.5 13.5 0 0 1 36.51 17.44ZM66.63 51.53A17 17 0 0 1 33.37 51.53A4 4 0 0 1 41.2 49.87A9 9 0 0 0 58.8 49.87A4 4 0 0 1 66.63 51.53Z'

/** La flor de humans: ocho pétalos y una sonrisa calada, en el color del texto que la rodea. */
export function Logo({ size = 32, label, className }: {
  /** El lado en px. */
  size?: number
  /** Solo si va sola: al lado del nombre es decorativa y el lector no la anuncia. */
  label?: string
  /** Para el color y el margen, que dependen de dónde esté. */
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path fill="currentColor" fillRule="evenodd" d={flower} />
    </svg>
  )
}

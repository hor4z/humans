/** La foto de una de las caras de ejemplo, que viven en `kit/public/avatars`. */
export const face = (n: number) => `/avatars/${String(n).padStart(2, '0')}.webp`

/** Una persona de ejemplo, con foto o sin ella. */
export const person = (name: string, photo?: number) => ({ name, src: photo ? face(photo) : undefined })

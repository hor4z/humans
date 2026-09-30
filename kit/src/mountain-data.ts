import type { IconName } from '@milo/ui/icon'

/** El tono de un punto de la ruta: campamento, parte del clima, trepada o cumbre. */
export type Tone = 'sky' | 'coral' | 'lime' | 'ink'

/** Una foto con su crédito, que la licencia pide mostrar al lado. */
export type Photo = { src: string; title: string; text: string; author: string; license: string; licenseUrl: string; source: string }

/** Las fotos de la montaña, todas de Wikimedia Commons. */
export const PHOTOS: Photo[] = [
  { src: '/montana/amboseli.jpg', title: 'Kibo desde Amboseli', text: 'El Kilimanjaro sobre un mar de nubes, visto desde el parque nacional Amboseli, en Kenia.', author: 'Sergey Pesterev', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', source: 'https://commons.wikimedia.org/wiki/File:Kilimanjaro_from_Amboseli.jpg' },
  { src: '/montana/sunrise.jpg', title: 'Glaciar de la cumbre', text: 'Los últimos glaciares de la cima al amanecer, con la sombra del volcán sobre las nubes.', author: 'Roryjm0', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', source: 'https://commons.wikimedia.org/wiki/File:Glacier_at_the_peak_of_Mount_Kilimanjaro_at_sunrise.jpg' },
  { src: '/montana/uhuru.jpg', title: 'Uhuru Peak', text: 'El punto más alto de África, a 5.895 m sobre el nivel del mar.', author: 'Altezzatravel', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', source: 'https://commons.wikimedia.org/wiki/File:Uhuru_Peak_Mount_Kilimanjaro_Tanzania.jpg' },
  { src: '/montana/elephant.jpg', title: 'Elefante y Kilimanjaro', text: 'La postal clásica de Tanzania: la sabana de Amboseli al pie de la montaña.', author: 'Charles Asik', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Elephant_and_Kilimanjaro.jpg' },
  { src: '/montana/shira.jpg', title: 'Meseta de Shira', text: 'La meseta volcánica a 3.800 m, con el Kibo asomando detrás del páramo.', author: 'Stig Nygaard', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Shira_plateau.jpg' },
  { src: '/montana/barranco.jpg', title: 'Campamento Barranco', text: 'Un arcoíris sobre el muro de Barranco, visto desde las carpas del campamento.', author: 'KpokeJlJla', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', source: 'https://commons.wikimedia.org/wiki/File:Rainbow_and_Barranco_wall,_Barranco_camp,_Kilimanjaro_region,_Tanzania.jpg' },
  { src: '/montana/barranco-wall.jpg', title: 'Muro de Barranco', text: 'Montañistas trepando la pared de roca volcánica rumbo a Karanga.', author: 'Altezzatravel', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', source: 'https://commons.wikimedia.org/wiki/File:Climbers_Barranco_Wall_Kilimanjaro_Tanzania.jpg' },
  { src: '/montana/barafu.jpg', title: 'Campamento Barafu', text: 'El campamento alto, entre rocas y viento, desde donde se sale de noche a la cumbre.', author: 'Jorge Láscar', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Lascar_The_inhospitable_Barafu_camp,_the_goal_of_the_fourth_day_(4464782140).jpg' },
]

/** Un punto de la ruta: dónde cae sobre el sendero (`u`, de 0 a 1), a qué altura y qué pasó ahí. */
export type Place = { u: number; icon: IconName; tone: Tone; name: string; altitude: number; day: number; date: string; text: string; photo: number; data: [string, string][] }

/** Los seis puntos de la ruta Machame, de la selva a la cumbre. Son los de Sherpa. */
export const PLACES: Place[] = [
  { u: 0, icon: 'camping', tone: 'sky', name: 'Campamento Machame', altitude: 2835, day: 1, date: '17.06 · 17:10', text: 'Primera noche en la selva nubosa, después de once kilómetros de sendero húmedo desde la puerta del parque.', photo: 0, data: [['Tramo', '11 km · 6 h'], ['Grupo', '6 personas'], ['Guía', 'Oliver Harmons'], ['Estado', 'Aprobado']] },
  { u: 0.28, icon: 'radio', tone: 'coral', name: 'Meseta de Shira', altitude: 3750, day: 2, date: '18.06 · 6:05', text: 'Parte del clima por radio: viento fuerte del este y helada al amanecer. El grupo sale con capas extra.', photo: 4, data: [['Viento', '32 km/h'], ['Temperatura', '−8 °C'], ['Humedad', '41 %'], ['Aviso', 'Helada']] },
  { u: 0.5, icon: 'camping', tone: 'sky', name: 'Campamento Barranco', altitude: 3960, day: 3, date: '20.06 · 17:40', text: 'Al pie del muro, en un valle protegido. Día de aclimatación: se sube a la Torre de Lava y se vuelve a dormir abajo.', photo: 5, data: [['Tramo', '10 km · 7 h'], ['Carpas', '3'], ['Saturación', '91 %'], ['Estado', 'Aprobado']] },
  { u: 0.72, icon: 'back_hand', tone: 'lime', name: 'Muro de Barranco', altitude: 4200, day: 4, date: '21.06 · 8:20', text: 'Trepada con manos por roca volcánica: doscientos cincuenta metros de desnivel en poco más de una hora.', photo: 6, data: [['Desnivel', '257 m'], ['Tiempo', '1 h 10 min'], ['Dificultad', 'Media'], ['Estado', 'Aprobado']] },
  { u: 0.86, icon: 'radio', tone: 'coral', name: 'Campamento Barafu', altitude: 4673, day: 5, date: '21.06 · 23:30', text: 'Último parte antes del ataque a la cumbre. Se sale a medianoche con frontales, con el glaciar a la vista.', photo: 7, data: [['Viento', '45 km/h'], ['Temperatura', '−14 °C'], ['Salida', '00:00'], ['Aviso', 'Frío extremo']] },
  { u: 1, icon: 'flag', tone: 'ink', name: 'Cumbre Uhuru', altitude: 5895, day: 6, date: '22.06 · 6:48', text: 'El techo de África. Los seis llegan con el sol: doce minutos arriba para la foto y empieza el descenso.', photo: 2, data: [['Altura', '5.895 m'], ['Grupo', '6 de 6'], ['En la cima', '12 min'], ['Estado', 'Aprobado']] },
]

/** La ficha de la montaña, para la clase: lo que un chico de secundaria tiene que poder ubicar y explicar. */
export const FACTS: [string, string][] = [
  ['Dónde', 'Tanzania, unos 340 km al sur del ecuador, pegado a la frontera con Kenia'],
  ['Altura', '5.895 m en Uhuru Peak: el punto más alto de África'],
  ['Qué es', 'Un estratovolcán inactivo, con tres conos: Kibo, Mawenzi y Shira'],
  ['Pisos', 'De la sabana a la cumbre cruza cinco: cultivos, selva nubosa, brezal, desierto alpino y zona ártica'],
  ['Glaciares', 'Perdió más del 80 % del hielo desde 1912'],
]

/** El ángulo alrededor de la montaña por el que pasa el sendero en `u`. */
export const th = (u: number) => 2.4 + u * 2.6

/** El giro que deja un punto de frente a la cámara, por el camino más corto desde el giro actual. */
export function facing(u: number, current: number) {
  const base = Math.PI / 2 - th(u) + 0.6
  return base + Math.round((current - base) / (Math.PI * 2)) * Math.PI * 2
}

/** El punto de al lado, dando la vuelta en las puntas. */
export const neighbor = (i: number, step: number) => (i + step + PLACES.length) % PLACES.length

/** Los metros con el punto de los miles, como se escriben acá. */
export const meters = (m: number) => m.toLocaleString('es-AR')

/** Una curva que pasa por todos los puntos sin pasarse de ninguno: monótona entre cada par, como el perfil de Sherpa. */
export function smoothCurve(xs: number[], ys: number[], x: number) {
  const n = xs.length
  if (x <= xs[0]) return ys[0]
  if (x >= xs[n - 1]) return ys[n - 1]
  const d = xs.slice(0, -1).map((_, i) => (ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]))
  const m = xs.map((_, i) => {
    if (i === 0) return d[0]
    if (i === n - 1) return d[n - 2]
    if (d[i - 1] * d[i] <= 0) return 0
    const w1 = 2 * (xs[i + 1] - xs[i]) + (xs[i] - xs[i - 1])
    const w2 = (xs[i + 1] - xs[i]) + 2 * (xs[i] - xs[i - 1])
    return (w1 + w2) / (w1 / d[i - 1] + w2 / d[i])
  })
  const i = Math.max(0, xs.findIndex((_, k) => k < n - 1 && x < xs[k + 1]))
  const h = xs[i + 1] - xs[i]
  const t = (x - xs[i]) / h
  const t2 = t * t
  const t3 = t2 * t
  return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1]
}

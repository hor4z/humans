/* Generado por scripts/props.mjs: no se edita a mano. */

import type { ComponentDoc } from '@milo/ui/props'

export const sitePropsByComponent: Record<string, ComponentDoc> = {
  "Folder": {
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "doc": "El `Folder.Label` y, si va, el `Folder.Meta`."
      },
      {
        "name": "sheets",
        "type": "2 | 3",
        "required": false,
        "def": "3",
        "doc": "Cuántas hojas se abanican."
      },
      {
        "name": "size",
        "type": "number",
        "required": false,
        "def": "128",
        "doc": "El ancho de la carpeta en px."
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "doc": "Un token, no un hex."
      },
      {
        "name": "avatars",
        "type": "readonly { name: string; src?: string }[]",
        "required": false,
        "doc": "Quiénes tienen acceso, abajo a la izquierda."
      },
      {
        "name": "badges",
        "type": "ReactNode",
        "required": false,
        "doc": "Lo mismo pero a mano, para lo que no es una persona: un logo, un icono."
      },
      {
        "name": "onClick",
        "type": "() => void",
        "required": false,
        "doc": "Sin esto es un <div> y no se puede tabular."
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      }
    ],
    "doc": "Una carpeta que se abre."
  },
  "Folder.Label": {
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true
      }
    ],
    "doc": "El nombre, debajo."
  },
  "Folder.Meta": {
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true
      }
    ],
    "doc": "La línea de apoyo: \"15 archivos\"."
  },
  "PrefsProvider": {
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true
      }
    ]
  },
  "Prefs": {
    "props": [
      {
        "name": "theme",
        "type": "'light' | 'dark'",
        "required": true
      },
      {
        "name": "suggest",
        "type": "boolean",
        "required": true
      },
      {
        "name": "resume",
        "type": "boolean",
        "required": true
      },
      {
        "name": "showLens",
        "type": "boolean",
        "required": true
      },
      {
        "name": "shareRecipes",
        "type": "boolean",
        "required": true
      },
      {
        "name": "directory",
        "type": "boolean",
        "required": true
      },
      {
        "name": "confirmDelete",
        "type": "boolean",
        "required": true
      },
      {
        "name": "notifySubmission",
        "type": "boolean",
        "required": true
      },
      {
        "name": "notifyStuck",
        "type": "boolean",
        "required": true
      },
      {
        "name": "notifyWeekly",
        "type": "boolean",
        "required": true
      },
      {
        "name": "notifyProduct",
        "type": "boolean",
        "required": true
      },
      {
        "name": "sidebarCollapsed",
        "type": "boolean",
        "required": true
      }
    ]
  },
  "SettingsModal": {
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": true,
        "doc": "Cerrado no monta nada."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "doc": "Al cerrar no hay navegación: seguís donde estabas."
      },
      {
        "name": "user",
        "type": "SettingsUser",
        "required": true,
        "doc": "Quién está mirando los ajustes."
      }
    ],
    "doc": "Los ajustes en un modal y no en una página."
  },
  "SettingsUser": {
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true
      },
      {
        "name": "email",
        "type": "string",
        "required": true
      },
      {
        "name": "alias",
        "type": "string",
        "required": true,
        "doc": "Cómo lo ven los aprendices."
      },
      {
        "name": "school",
        "type": "string",
        "required": true
      }
    ],
    "doc": "Quién está mirando los ajustes."
  }
}

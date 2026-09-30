import './app.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrefsProvider } from './demo/prefs/prefs'
import { App } from './app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrefsProvider>
      <App />
    </PrefsProvider>
  </StrictMode>,
)

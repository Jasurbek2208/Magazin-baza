import './index.css'
import App from './App'
import ReactDOM from 'react-dom/client'

const SW_REFRESH_KEY: string = 'admin.flakon.uz_swRefreshed'

const hasRefreshed = (): boolean => localStorage?.getItem(SW_REFRESH_KEY) === 'true'
const markRefreshed = (): void => localStorage?.setItem(SW_REFRESH_KEY, 'true')

if ('serviceWorker' in navigator) {
  navigator?.serviceWorker?.addEventListener('controllerchange', () => {
    if (hasRefreshed()) return
    markRefreshed()
    window?.location?.reload()
  })

  navigator?.serviceWorker?.register('/sw.js')?.then((registration) => {
    registration?.addEventListener('updatefound', () => {
      const newWorker = registration?.installing

      if (newWorker) {
        newWorker?.addEventListener('statechange', () => {
          if (newWorker?.state === 'installed' && navigator?.serviceWorker?.controller) {
            if (confirm('New version available. Update now?')) newWorker?.postMessage({ type: 'SKIP_WAITING' })
          }
        })
      }
    })
  })
}

ReactDOM?.createRoot(document?.getElementById('root')!)?.render(<App />)
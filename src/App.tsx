import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { useAppConfigurationStore } from './app-configuration.store'
import HomePage from './components/pages/home/home.page'
import SettingsPage from './components/pages/settings/settings.page'

function App() {
  const isAppReady = useAppConfigurationStore((s) => s.isAppReady)

  if (!isAppReady) {
    return <SettingsPage />
  }

  return <HomePage />
}

export default App

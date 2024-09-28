import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { useAppConfigurationStore } from './app-configuration.store'
import SettingsPage from './components/pages/settings/settings-page'
import { router } from './router'

const queryClient = new QueryClient()

function App() {
  const isAppReady = useAppConfigurationStore((s) => s.isAppReady)

  if (!isAppReady) {
    return <SettingsPage />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App

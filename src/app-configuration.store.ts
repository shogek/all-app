import { create } from 'zustand'

function getTursoDatabaseUrl() {
  return import.meta.env.VITE_TURSO_DATABASE_URL ?? globalThis.localStorage.getItem('ALL-APP:tursoDatabaseUrl')
}

function getTursoAuthToken() {
  return import.meta.env.VITE_TURSO_AUTH_TOKEN ?? globalThis.localStorage.getItem('ALL-APP:tursoAuthToken')
}

const initialDatabaseUrl = getTursoDatabaseUrl()
const initialAuthToken = getTursoAuthToken()

type ReadyConfiguration = {
  tursoDatabaseUrl: string
  tursoAuthToken: string
}

type AppConfigurationState = {
  isAppReady: boolean
  configuration: {
    tursoDatabaseUrl: string | null
    tursoAuthToken: string | null
  }
  setConfiguration: (config: ReadyConfiguration) => void
}

export const useAppConfigurationStore = create<AppConfigurationState>((set) => ({
  isAppReady: !!initialDatabaseUrl && !!initialAuthToken,
  configuration: {
    tursoDatabaseUrl: initialDatabaseUrl,
    tursoAuthToken: initialAuthToken,
  },
  setConfiguration: (config: ReadyConfiguration) =>
    set((state) => {
      globalThis.localStorage.setItem('ALL-APP:tursoDatabaseUrl', config.tursoDatabaseUrl)
      globalThis.localStorage.setItem('ALL-APP:tursoAuthToken', config.tursoAuthToken)

      return {
        ...state,
        isAppReady: true,
        configuration: {
          tursoDatabaseUrl: config.tursoDatabaseUrl,
          tursoAuthToken: config.tursoAuthToken,
        },
      }
    }),
}))

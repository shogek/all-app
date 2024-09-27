import { create } from 'zustand';

function getTursoDatabaseUrl() {
  return import.meta.env.VITE_TURSO_DATABASE_URL ?? globalThis.localStorage.getItem('ALL-APP:tursoDatabaseUrl');
}

function getTursoAuthToken() {
  return import.meta.env.VITE_TURSO_AUTH_TOKEN ?? globalThis.localStorage.getItem('ALL-APP:tursoAuthToken');
}

const initialDatabaseUrl = getTursoDatabaseUrl();
const initialAuthToken = getTursoAuthToken();

type AppConfigurationState = {
  appInitialized: boolean;
  tursoDatabaseUrl: string | null;
  tursoAuthToken: string | null;
  setTursoDatabaseUrl: (databaseUrl: string) => void;
  setTursoAuthToken: (authToken: string) => void;
};

export const useAppConfigurationStore = create<AppConfigurationState>((set) => ({
  appInitialized: !!initialDatabaseUrl && !!initialAuthToken,
  tursoDatabaseUrl: initialDatabaseUrl,
  tursoAuthToken: initialAuthToken,
  // TODO (Benas): Simplify this nonsense
  setTursoDatabaseUrl: (databaseUrl: string) =>
    set((state) => {
      globalThis.localStorage.setItem('ALL-APP:tursoDatabaseUrl', databaseUrl);

      return {
        ...state,
        tursoDatabaseUrl: databaseUrl,
        appInitialized: !!databaseUrl && !!state.tursoAuthToken,
      };
    }),
  setTursoAuthToken: (authToken: string) =>
    set((state) => {
      globalThis.localStorage.setItem('ALL-APP:tursoAuthToken', authToken);

      return { ...state, tursoAuthToken: authToken, appInitialized: !!authToken && !!state.tursoDatabaseUrl };
    }),
}));

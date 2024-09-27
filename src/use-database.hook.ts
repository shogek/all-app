import { createClient } from '@libsql/client'
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql'
import { useShallow } from 'zustand/shallow'
import { useAppConfigurationStore } from './app-configuration.store'

let database: LibSQLDatabase | null = null

export function useDatabase(): LibSQLDatabase {
  const { isAppReady, configuration } = useAppConfigurationStore(
    useShallow((s) => ({ isAppReady: s.isAppReady, configuration: s.configuration }))
  )

  if (!isAppReady) {
    throw new Error('Attempted to use the database before the configuration step was completed!')
  }

  if (!database) {
    const turso = createClient({
      url: configuration.tursoDatabaseUrl!,
      authToken: configuration.tursoAuthToken!,
    })

    database = drizzle(turso)
  }

  return database
}

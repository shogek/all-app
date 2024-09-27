import { memo, useState } from 'react'
import s from './settings.page.module.scss'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useShallow } from 'zustand/shallow'
import { useAppConfigurationStore } from '../../../app-configuration.store'

function SettingsPage() {
  const { configuration, setConfiguration } = useAppConfigurationStore(
    useShallow((s) => ({
      configuration: s.configuration,
      setConfiguration: s.setConfiguration,
    }))
  )

  const [databaseUrl, setDatabaseUrl] = useState(configuration.tursoDatabaseUrl ?? '')
  const [authToken, setAuthToken] = useState(configuration.tursoAuthToken ?? '')

  const handleClickSave = () => {
    setConfiguration({
      tursoDatabaseUrl: databaseUrl,
      tursoAuthToken: authToken,
    })
  }

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Settings</h1>

      {/* TODO: Add min length validation */}
      <TextField
        variant="outlined"
        label="Turso database URL"
        value={databaseUrl}
        onChange={(e) => setDatabaseUrl(e.target.value)}
      />

      {/* TODO: Add min length validation */}
      <TextField
        variant="outlined"
        label="Turso auth token"
        value={authToken}
        multiline
        onChange={(e) => setAuthToken(e.target.value)}
      />

      <div className={s.buttonWrapper}>
        <Button variant="contained" onClick={handleClickSave}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default memo(SettingsPage)

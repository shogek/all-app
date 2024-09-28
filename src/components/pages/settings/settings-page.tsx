import { memo, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useShallow } from 'zustand/shallow'
import { useAppConfigurationStore } from '../../../app-configuration.store'
import * as S from './settings-page.styles'

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
    <S.Wrapper>
      <Typography variant="h4" sx={{ marginBottom: '16px' }}>
        Settings
      </Typography>

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

      <S.ButtonWrapper>
        <Button variant="contained" onClick={handleClickSave}>
          Save
        </Button>
      </S.ButtonWrapper>
    </S.Wrapper>
  )
}

export default memo(SettingsPage)

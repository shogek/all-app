import { memo, useState } from 'react';
import s from './settings.page.module.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useShallow } from 'zustand/shallow';
import { useAppConfigurationStore } from '../../app-configuration.store';

function SettingsPage() {
  //   const [tursoAuthToken, tursoDatabaseUrl, setTursoAuthToken, setTursoDatabaseUrl] = useAppConfigurationStore(
  //     (s) => [s.tursoAuthToken, s.tursoDatabaseUrl, s.setTursoAuthToken, s.setTursoDatabaseUrl],
  //     shallow
  //   );

  const { tursoAuthToken, tursoDatabaseUrl, setTursoAuthToken, setTursoDatabaseUrl } = useAppConfigurationStore(
    useShallow((s) => ({
      tursoAuthToken: s.tursoAuthToken,
      tursoDatabaseUrl: s.tursoDatabaseUrl,
      setTursoAuthToken: s.setTursoAuthToken,
      setTursoDatabaseUrl: s.setTursoDatabaseUrl,
    }))
  );

  // const as = useAppConfigurationStore(s => s.)
  //   const {
  //     configuration: { tursoDatabaseUrl, tursoAuthToken },
  //     onUpdateConfiguration,
  //   } = useAppConfiguration();

  const [databaseUrl, setDatabaseUrl] = useState(tursoDatabaseUrl ?? '');
  const [authToken, setAuthToken] = useState(tursoAuthToken ?? '');

  const handleClickSave = () => {
    setTursoDatabaseUrl(databaseUrl);
    setTursoAuthToken(authToken);
    //  onUpdateConfiguration({
    // tursoDatabaseUrl: databaseUrl,
    // tursoAuthToken: authToken,
    //  });
  };

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Settings</h1>

      <TextField
        variant="outlined"
        label="Turso database URL"
        value={databaseUrl}
        onChange={(e) => setDatabaseUrl(e.target.value)}
      />

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
  );
}

export default memo(SettingsPage);

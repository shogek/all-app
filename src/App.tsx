import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import viteLogo from '/vite.svg';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import { createClient, ResultSet } from '@libsql/client';
// import TextField from '@mui/material/TextField';
// import { drizzle } from 'drizzle-orm/libsql';
import { useAppConfigurationStore } from './app-configuration.store';
// import reactLogo from './assets/react.svg';
// import Header from './components/header/header';
import SettingsPage from './components/pages/settings.page';

// import { todoTable, userTable } from './db/schema';

// const turso = createClient({
//   url: tursoDatabaseUrl,
//   authToken: tursoAuthToken,
// });

// const db = drizzle(turso);

let fetched = false;

function App() {
  // const { hasAllConfiguration } = useAppConfiguration();
  const appInitialized = useAppConfigurationStore((s) => s.appInitialized);

  useEffect(() => {
    if (fetched) {
      return;
    }

    const fetchData = async () => {
      // const results = await turso.execute("SELECT * FROM todos");
      // const results = await db.select().from(todoTable).all();
      // const results = await db.select().from(userTable).all();
      // setResult(results);
      fetched = true;
    };

    fetchData();
  }, []);

  if (!appInitialized) {
    // if (hasAllConfiguration) {
    return <SettingsPage />;
  }

  return (
    <>
      <CssBaseline />

      <div className="card">
        {/* {result.length && (
          <ul>
            {result.map((x) => (
              <li key={x.order}>
                {x.order} - {x.text}
              </li>
            ))}
          </ul>
        )}
        <p>{JSON.stringify(result)}</p> */}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
/*
  CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    [order] INTEGER NOT NULL 
  );

  INSERT INTO todos (text, order) VALUES ("vienas", 1), ("du", 2);

  SELECT * FROM todos;
*/

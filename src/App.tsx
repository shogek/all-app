import { useEffect, useState } from 'react';
import viteLogo from '/vite.svg';
import { drizzle } from 'drizzle-orm/libsql';
import reactLogo from './assets/react.svg';

import './App.css';
import '@mantine/core/styles.css';

import { createClient, ResultSet } from '@libsql/client';
import { MantineProvider } from '@mantine/core';
import Header from './components/header/header';
import { todoTable, userTable } from './db/schema';

const tursoDatabaseUrl = import.meta.env.VITE_TURSO_DATABASE_URL;
const tursoAuthToken = import.meta.env.VITE_TURSO_AUTH_TOKEN;
if (!tursoDatabaseUrl || !tursoAuthToken) {
  throw new Error('Missing values in .env file!');
}

const turso = createClient({
  url: tursoDatabaseUrl,
  authToken: tursoAuthToken,
});

const db = drizzle(turso);

let fetched = false;

function App() {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState<any[]>([]);

  useEffect(() => {
    if (fetched) {
      return;
    }

    const fetchData = async () => {
      // const results = await turso.execute("SELECT * FROM todos");
      const results = await db.select().from(todoTable).all();
      // const results = await db.select().from(userTable).all();
      setResult(results);
      fetched = true;
    };

    fetchData();
  }, []);

  return (
    <MantineProvider>
      <Header />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        {result.length && (
          <ul>
            {result.map((x) => (
              <li key={x.order}>
                {x.order} - {x.text}
              </li>
            ))}
          </ul>
        )}
        <p>{JSON.stringify(result)}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </MantineProvider>
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

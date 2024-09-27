import { memo, useEffect, useState } from 'react'
import s from './home.page.module.scss'
import { todoTable } from '../../../db/schema'
import { useDatabase } from '../../../use-database.hook'

let fetched = false

function HomePage() {
  const database = useDatabase()
  const [results, setResults] = useState<any>([])

  useEffect(() => {
    if (fetched) {
      return
    }

    const fetchData = async () => {
      const results = await database.select().from(todoTable).all()
      setResults(results)
      fetched = true
    }

    fetchData()
  }, [])

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Home v2</h1>
      <p>{JSON.stringify(results)}</p>
    </div>
  )
}

export default memo(HomePage)

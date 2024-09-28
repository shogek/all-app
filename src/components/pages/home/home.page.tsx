import { memo, useEffect, useState } from 'react'
import s from './home.page.module.scss'
import { ChecklistNote, checklistNotes } from '../../../db/schema/checklist-notes'
import { useDatabase } from '../../../use-database.hook'
import TodoList from '../../features/todo-list/todo-list'

let fetched = false

function HomePage() {
  const database = useDatabase()
  const [results, setResults] = useState<ChecklistNote[]>([])

  useEffect(() => {
    if (fetched) {
      return
    }

    const fetchData = async () => {
      const results = await database.select().from(checklistNotes).all()
      setResults(results)
      fetched = true
    }

    fetchData()
  }, [])

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Home v2</h1>
      {results.map((x) => (
        <TodoList {...x} />
      ))}
    </div>
  )
}

export default memo(HomePage)

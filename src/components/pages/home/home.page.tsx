import { memo } from 'react'
import s from './home.page.module.scss'
import { Link } from 'react-router-dom'
import useChecklistNotes from '../../shared/hooks/use-checklist-notes.hook'

function HomePage() {
  const { data, isLoading } = useChecklistNotes()

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Home v2</h1>

      {isLoading && <span>Fetching checklist notes...</span>}

      {!isLoading &&
        (data ?? []).map((x) => (
          <Link key={x.id} to={`checklist-note/${x.id}`}>
            ({x.id}) {x.title}
          </Link>
        ))}
    </div>
  )
}

export default memo(HomePage)

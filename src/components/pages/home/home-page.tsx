import { memo } from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import useChecklistNotes from '../../shared/hooks/use-checklist-notes.hook'
import * as S from './home-page.styles'

function HomePage() {
  const { data, isLoading } = useChecklistNotes()

  return (
    <S.Wrapper>
      <Typography variant="h4">Home</Typography>

      {isLoading && <span>Fetching checklist notes...</span>}

      {!isLoading &&
        (data ?? []).map((x) => (
          <Link key={x.id} to={`checklist-note/${x.id}`}>
            {x.title}
          </Link>
        ))}
    </S.Wrapper>
  )
}

export default memo(HomePage)

import { memo } from 'react'
import Typography from '@mui/material/Typography'
import ChecklistNoteOverview from '../../features/checklist-note-overview/checklist-note-overview'
import useChecklistNotes from '../../shared/hooks/use-checklist-notes.hook'
import * as S from './home-page.styles'

function HomePage() {
  const { data: checklistNotes, isLoading } = useChecklistNotes()

  return (
    <S.Wrapper>
      <Typography variant="h4">Home</Typography>

      {isLoading && <span>Fetching checklist notes...</span>}

      {!isLoading && (checklistNotes ?? []).map((checklistNote) => <ChecklistNoteOverview {...checklistNote} />)}
    </S.Wrapper>
  )
}

export default memo(HomePage)

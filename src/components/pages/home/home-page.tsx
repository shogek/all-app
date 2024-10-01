import { memo } from 'react'
import ChecklistNoteOverview from '../../features/checklist-note-overview/checklist-note-overview'
import useChecklistNotes from '../../shared/hooks/use-checklist-notes.hook'
import * as S from './home-page.styles'

function HomePage() {
  const { data: checklistNotes, isLoading } = useChecklistNotes()

  return (
    <S.Wrapper>
      {isLoading && <span>Fetching checklist notes...</span>}

      {!isLoading &&
        (checklistNotes ?? []).map((checklistNote) => (
          <ChecklistNoteOverview key={checklistNote.id} {...checklistNote} />
        ))}
    </S.Wrapper>
  )
}

export default memo(HomePage)

import { useParams } from 'react-router-dom'
import ChecklistNoteDetails from '../../features/checklist-note-details/checklist-note-details'
import useChecklistNote from '../../shared/hooks/use-checklist-note.hook'

export default function ChecklistNotePage() {
  const urlParams = useParams()
  const checklistNoteId = urlParams.checklistNoteId ?? '-1'
  const { data: checklistNote, isLoading } = useChecklistNote(checklistNoteId)

  if (isLoading) {
    return <span>Retrieving checklist notes...</span>
  }

  if (!checklistNote) {
    throw new Error(`Checklist note with ID (${checklistNoteId}) not found!`)
  }

  return <ChecklistNoteDetails {...checklistNote} />
}

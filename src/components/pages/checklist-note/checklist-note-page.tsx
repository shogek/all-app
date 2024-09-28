import { useParams } from 'react-router-dom'
import TodoList from '../../features/todo-list/todo-list'
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

  return <TodoList {...checklistNote} />
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { eq } from 'drizzle-orm'
import { ChecklistNote, checklistNotes } from '../../../db/schema/checklist-notes'
import { useDatabase } from '../../../use-database.hook'

export default function useUpdateChecklistNote() {
  const database = useDatabase()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updated: ChecklistNote) => {
      await database.update(checklistNotes).set(updated).where(eq(checklistNotes.id, updated.id))
      return updated
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['checklist-notes', result.id.toString()], () => {
        return result
      })
    },
  })
}

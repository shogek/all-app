import { useQuery } from '@tanstack/react-query'
import { eq } from 'drizzle-orm'
import { checklistNotes } from '../../../db/schema/checklist-notes'
import { useDatabase } from '../../../use-database.hook'

export default function useChecklistNote(checklistNoteId: string) {
  const database = useDatabase()

  return useQuery({
    queryKey: ['checklist-notes', checklistNoteId],
    queryFn: async () => {
      const users = await database.select().from(checklistNotes).where(eq(checklistNotes.id, +checklistNoteId))

      return users[0]
    },
  })
}

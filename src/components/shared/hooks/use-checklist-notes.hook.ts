import { useQuery } from '@tanstack/react-query'
import { checklistNotes } from '../../../db/schema/checklist-notes'
import { useDatabase } from '../../../use-database.hook'

export default function useChecklistNotes() {
  const database = useDatabase()

  return useQuery({
    queryKey: ['checklist-notes'],
    queryFn: () => {
      return database.select().from(checklistNotes).all()
    },
  })
}

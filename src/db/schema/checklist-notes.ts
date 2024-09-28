import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const checklistNotes = sqliteTable('checklist_notes', {
  id: integer('id').notNull(),
  title: text('title'),
  isArchived: integer('is_archived', { mode: 'boolean' }).notNull(),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).notNull(),
  backgroundType: integer('background_type'),
  json: text('json'),
})

export type ChecklistNote = typeof checklistNotes.$inferSelect

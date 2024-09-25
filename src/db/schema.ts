import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const todoTable = sqliteTable("todos", {
  id: integer("id").notNull(),
  text: text("text").notNull(),
  order: integer("order").notNull(),
});

export const userTable = sqliteTable("users", {
  id: integer("ID").notNull(),
  name: text("name").notNull(),
});

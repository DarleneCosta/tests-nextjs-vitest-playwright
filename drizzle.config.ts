import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/db/drizzle/migrations',
  schema: './src/core/todo/schemas/drizzle-todo-table.schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'dev.db.sqlite3',
  },
});
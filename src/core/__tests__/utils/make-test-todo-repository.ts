import { DrizzleTodoRepository } from '@/core/todo/repositories/drizzle-todo.repository';
import { drizzleDatabase } from '@/db/drizzle/migrations';
import { Todo } from '@/core/todo/schemas/todo.contract';
import { eq } from 'drizzle-orm';

export async function makeTestTodoRepository() {
  const { db, todoTable } = drizzleDatabase;
  const repository = new DrizzleTodoRepository(db);
  const insertTodoDb = (todo: Todo) => db.insert(todoTable).values(todo);
  const deleteTodoNoWhere = () => db.delete(todoTable);
  const deleteTodoDb = (id: string) =>
    db.delete(todoTable).where(eq(todoTable.id, id));

  return { repository, insertTodoDb, deleteTodoNoWhere, deleteTodoDb };
}

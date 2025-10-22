import { DrizzleDatabase } from "@/db/drizzle/migrations";
import { todoTable } from "../schemas/drizzle-todo-table.schema";
import { Todo, TodoPresenter  } from "../schemas/todo.contract";
import { TodoRepository } from "./todo.contract.repository";
import { eq } from "drizzle-orm";

export class DrizzleTodoRepository implements TodoRepository {
    private readonly db: DrizzleDatabase;
    constructor(db: DrizzleDatabase) {
        this.db = db;
    }

    async findAll(): Promise<Todo[]> {
        const todos = await this.db.query.todo.findMany({
            orderBy: (todo, { desc }) => [desc(todo.createdAt), desc(todo.description)],
        });
        return todos
    }    

    async create(todo: Todo): Promise<TodoPresenter> {
        const existingTodo = await this.db.query.todo.findFirst({
            where: (todoTable, { eq, or }) => or
            (eq(todoTable.description, todo.description), eq(todoTable.id, todo.id)),
        });

        if (existingTodo) {
            return {
                success: false,
                errors: ['Já existe um todo com esta descrição ou id informado.'],
            } ;
        }
        const result = await this.db.insert(todoTable).values(todo).returning();
        return {
            success: true,
            todo: result[0],
        };
    }

    async remove(id: string): Promise<TodoPresenter> {
        const existingTodo = await this.db.query.todo.findFirst({
            where: (todoTable, { eq }) => eq(todoTable.id, id),
        });
        if (!existingTodo) {
            return {
                success: false,
                errors: ['Todo não encontrado.'],
            } ;
        }
       await this.db.delete(todoTable).where(eq(todoTable.id, id))
        return {
            success: true,
            todo: existingTodo,
        };
   }
}
import { sanitizeString } from "@/core/utils/sanitize-str";
import { Todo } from "../schemas/todo.contract";

export function makeNewTodo(description: string): Todo {
    const sanitizedDescription = sanitizeString(description);
    return {
        id:crypto.randomUUID(),
        description: sanitizedDescription,
        createdAt: new Date().toISOString()
    }
}
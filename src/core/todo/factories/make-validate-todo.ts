import { sanitizeString } from "@/core/utils/sanitize-str";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { makeNewTodo } from "./make-new-todo";
import { Todo } from "../schemas/todo.contract";

type InvalidTodo = {
    success: false;
    errors?: string[];
}

type ValidTodo = {
    success: true;
    data: Todo;
}

export function makeValidateTodo(description: string): InvalidTodo | ValidTodo{
    const cleanedDescription = sanitizeString(description);
    const validateDescription=validateTodoDescription(cleanedDescription);
    if(validateDescription.success){
        return {
            success: true,
            data: makeNewTodo(cleanedDescription),
        }
    }

    return {
        success: false,
        errors: validateDescription.errors,
    }
 
}
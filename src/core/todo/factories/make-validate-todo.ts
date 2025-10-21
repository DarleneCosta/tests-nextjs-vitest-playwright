import { sanitizeString } from "@/core/utils/sanitize-str";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { makeNewTodo } from "./make-new-todo";
import { TodoPresenter } from "../schemas/todo.contract";

export function makeValidateTodo(description: string): TodoPresenter{
    const cleanedDescription = sanitizeString(description);
    const validateDescription=validateTodoDescription(cleanedDescription);
    if(validateDescription.success){
        return {
            success: true,
            todo: makeNewTodo(cleanedDescription),
        }
    }

    return {
        success: false,
        errors: validateDescription.errors,
    }
 
}
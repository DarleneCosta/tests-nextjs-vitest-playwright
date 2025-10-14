import * as sanitizeStringModule from "@/core/utils/sanitize-str";
import { makeValidateTodo } from "./make-validate-todo";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { makeNewTodo } from "./make-new-todo";

describe('makeValidateTodo unit test', () => {
    it('should call the sanitizeString function with the correct value', () => {
       const description = 'Buy groceries'
       const sanitizeStringSpy = vi.spyOn(sanitizeStringModule, 'sanitizeString').mockReturnValue(description);
       //.mockReturnValue('um valor qualquer');//quando nao é uma promise   
       //.mockResolvedValue('um valor qualquer');//quando é uma promise
       //.mockRejectedValue('um valor qualquer');//quando é uma promise rejeitada
       //.mockImplementation(() => 'um valor qualquer');//substitui a funcao original

       makeValidateTodo(description);
       
        expect(sanitizeStringSpy).toHaveBeenCalledWith(description);
        expect(sanitizeStringSpy).toHaveBeenCalledTimes(1);
    });
    it('should call the validateTodoDescription function with the returned value from sanitizeString', () => {
        const validateTodoDescriptionSpy = vi.spyOn(validateTodoDescription, 'validateTodoDescription')
        .mockResolvedValue({ success: true });
        makeValidateTodo('Buy groceries');
        expect(validateTodoDescriptionSpy).toHaveBeenCalledWith('Buy groceries');
    });

    it('should call makeNewTodo if validateTodoDescription is successful', () => {
        const makeNewTodoSpy = vi.spyOn(makeNewTodo, 'makeNewTodo');
        makeValidateTodo('Buy groceries');
        expect(makeNewTodoSpy).toHaveBeenCalledWith('Buy groceries');
    });

    it('should return validateTodoDescription.errors if validateTodoDescription is not successful', () => {
        const result = makeValidateTodo('Buy groceries');
        expect(result.success).toBe(true);
    });

}); 
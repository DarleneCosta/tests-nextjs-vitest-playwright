import * as sanitizeStringModule from "@/core/utils/sanitize-str";
import { makeValidateTodo } from "./make-validate-todo";
import * as validateTodoDescriptionModule from "../schemas/validate-todo-description";
import * as makeNewTodoModule from "./make-new-todo";

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
        const description = 'Buy groceries'
        const validateTodoDescriptionSpy = vi.spyOn(validateTodoDescriptionModule, 'validateTodoDescription')
        .mockResolvedValue({ success: true });

        makeValidateTodo(description);
        expect(validateTodoDescriptionSpy).toHaveBeenCalledWith(description);
        expect(validateTodoDescriptionSpy).toHaveBeenCalledTimes(1);

    });

    it('should call makeNewTodo if validateTodoDescription is successful', () => {
        const makeNewTodoSpy = vi.spyOn(makeNewTodoModule, 'makeNewTodo');
        const description = 'Buy groceries'
        makeValidateTodo(description);
        expect(makeNewTodoSpy).toHaveBeenCalledWith(description);
        expect(makeNewTodoSpy).toHaveBeenCalledTimes(1);
    });

    it('should return validateTodoDescription.errors if validateTodoDescription is not successful', () => {
        const description = 'Buy groceries'
        const result = makeValidateTodo(description);
        expect(result.success).toBe(true);
    });

}); 
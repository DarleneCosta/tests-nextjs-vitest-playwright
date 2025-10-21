import * as sanitizeStringModule from "@/core/utils/sanitize-str";
import { makeValidateTodo } from "./make-validate-todo";
import * as validateTodoDescriptionModule from "../schemas/validate-todo-description";
import * as makeNewTodoModule from "./make-new-todo";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";

describe('makeValidateTodo unit test', () => {
    it('should call the sanitizeString function with the correct value', () => {
    const { sanitizeStringSpy, description } = makeMocks();
       //.mockReturnValue('um valor qualquer');//quando nao é uma promise   
       //.mockResolvedValue('um valor qualquer');//quando é uma promise
       //.mockRejectedValue('um valor qualquer');//quando é uma promise rejeitada
       //.mockImplementation(() => 'um valor qualquer');//substitui a funcao original

       makeValidateTodo(description);
        
        expect(sanitizeStringSpy).toHaveBeenCalledWith(description);
        expect(sanitizeStringSpy).toHaveBeenCalledTimes(1);
    });

    it('should call the validateTodoDescription function with the returned value from sanitizeString', () => {
        const { validateTodoDescriptionSpy, description } = makeMocks();

        makeValidateTodo(description);
        
        
        expect(validateTodoDescriptionSpy).toHaveBeenCalledWith(description);
        expect(validateTodoDescriptionSpy).toHaveBeenCalledTimes(1);


    });

    it('should call makeNewTodo if validateTodoDescription is successful', () => {
        const {  description, makeNewTodoSpy } = makeMocks();

        const result = makeValidateTodo(description) as ValidTodo;

        expect(result.success).toBe(true);
        expect(result.todo.description).toEqual(description);
        expect(result.todo.createdAt).toEqual(expect.any(Date));
        expect(result.todo.id).toEqual(expect.any(String));
        expect(makeNewTodoSpy).toHaveBeenCalledWith(description);
        expect(makeNewTodoSpy).toHaveBeenCalledTimes(1);

    });

    it('should return validateTodoDescription.errors if validateTodoDescription is not successful', () => {
        const errors = ['Error', 'any'];
        const { validateTodoDescriptionSpy, description } = makeMocks();

        validateTodoDescriptionSpy.mockReturnValue({ success: false, errors });
        
        const result = makeValidateTodo(description) as InvalidTodo;

        expect(result.success).toBe(false);
        expect(result.errors).toEqual(errors);
    });

}); 

const makeMocks = (description: string = 'Buy groceries') => {
    const expectedTodo = {
        id: expect.any(String),
        description: description,
        createdAt: expect.any(Date),
    };
    const sanitizeStringSpy = vi.spyOn(sanitizeStringModule, 'sanitizeString').mockReturnValue(description);
    const validateTodoDescriptionSpy = vi.spyOn(validateTodoDescriptionModule, 'validateTodoDescription')
    .mockReturnValue({ success: true });
    const makeNewTodoSpy = vi.spyOn(makeNewTodoModule, 'makeNewTodo').mockReturnValue(expectedTodo);
    return {
        sanitizeStringSpy,
        validateTodoDescriptionSpy,
        makeNewTodoSpy,
        description,
        expectedTodo,
    }
}
import { validateTodoDescription } from "./validate-todo-description";

describe('validateTodoDescription unit test', () => {
    it('should return success when description is valid', () => {
        const result = validateTodoDescription('Buy groceries');
        expect(result.success).toBe(true);
    });
    it('should return error when description have less than 3 characters', () => {
        const result = validateTodoDescription('Buy');
        expect(result.success).toBe(false);
        expect(result.errors).toEqual(['A descrição deve ter pelo menos 3 caracteres']);
    });
});